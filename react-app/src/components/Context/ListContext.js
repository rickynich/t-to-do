import { list } from "@chakra-ui/styled-system";
import React, { useContext, useState, useEffect, useReducer } from "react";

const ListContext = React.createContext({
    lists: [],
    // createNewList: () => {},
	// addTaskToList: () => {},
	// completeTask: (id) => {},
});

export function useList() {
	return useContext(ListContext);
}

const actions = {
	ADD_LIST: "ADD_LIST",
	ADD_TASK: "ADD_TASK",
	DELETE_LIST: "DELETE_LIST",
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_LIST:
			console.log(
				"State in reducer function: ",
				state,
				"incoming value: ",
				action.value
			);
			return { ...state, lists: action.value };
			case actions.ADD_TASK:
				console.log(
					"State in reducer function: ",
					state,
					"incoming value: ",
					action.value
				);
				return { ...state, tasks: action.value };
		case actions.DELETE_LIST:
			return { ...state };
		default:
			return state;
	}
}

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const [selectedList, setSelectedList] = useState();
	const [state, dispatch] = useReducer(reducer, lists) //add initial state to have current lists 

	//initial load
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/lists/');
			const responseData = await response.json();
			setLists(responseData.lists);
		}
		fetchData();
	}, [state]);

    async function createNewList(title) {
        const response = await fetch('/lists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
            });
			const newListResponseData = await response.json();
			return dispatch({ type: actions.ADD_LIST, value: newListResponseData });
	}
    async function createNewTask(listId, title, desc) {
        console.log("CREATE NEW TASK HIT. desc:", desc, "listId", listId, "title:", title)
        const response = await fetch(`/lists/${listId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title,
						desc
					}),
				});
			const newTaskResponseData = await response.json();
			return dispatch({ type: actions.ADD_TASK, value: newTaskResponseData });
	}

	async function deleteList(listId) {
		// console.log("List deleted (log from list context module). listId: ", listId)
		const response = await fetch(`/lists/${listId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		dispatch({type: actions.DELETE_LIST})
		return await response.json()
	}

	function completeTask(taskId) {
		setSelectedList();
	}

	// const values = {
	// 	lists,
	// 	completeTask,
	// 	createNewList,
	// 	deleteList
	// }

	return (
		<ListContext.Provider
			value={{ lists, completeTask, createNewList, deleteList, createNewTask }}
		>
			{children}
		</ListContext.Provider>
	);
}
