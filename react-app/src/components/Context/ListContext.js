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
	DELETE_LIST: "DELETE_LIST",
	ADD_TASK: "ADD_TASK",
	DELETE_LIST: "DELETE_TASK",
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_LIST:
			// console.log(
			// 	"State in reducer function: ",
			// 	state,
			// 	"incoming value: ",
			// 	action.value
			// );
			return { ...state, lists: action.value };
			case actions.DELETE_LIST:
				return { ...state };
			case actions.ADD_TASK:
				return { ...state, tasks: action.value };
			case actions.DELETE_TASK:
				return { ...state };
		default:
			return state;
	}
}

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const [tasks, setTasks] = useState(["default task"]);
	const [selectedList, setSelectedList] = useState([
		{ title: "default list", tasks: [{ title: "default task" }] },
	]);
	const initialValue = { lists, tasks };
	const [state, dispatch] = useReducer(reducer, initialValue); //add initial state to have current lists
	console.log("Lists array in context", lists);
	console.log("Selected list at start in context", selectedList);

	//initial load and state change
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/lists/");
			const responseData = await response.json();
			setLists(responseData.lists);
			// setComments(selectedList.tasks); // set comments next
		}
		fetchData();
	}, [state]);

	//tasks updater
	useEffect(() => {
		async function fetchTasksData() {
			const response = await fetch(`/lists/${selectedList.id}/tasks`);
			const responseData = await response.json();
			setTasks(responseData.tasks);
		}
		fetchTasksData();
	}, [state]);

	// List methods
	async function createNewList(title) {
		const response = await fetch("/lists/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
			}),
		});
		const newListResponseData = await response.json();
		return dispatch({ type: actions.ADD_LIST, value: newListResponseData });
	}
	async function deleteList(listId) {
		const response = await fetch(`/lists/${listId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch({ type: actions.DELETE_LIST });
		return await response.json();
	}

	//Task methods
	async function createNewTask(listId, title, desc) {
		const response = await fetch(`/lists/${listId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				desc,
			}),
		});
		const newTaskResponseData = await response.json();
		return dispatch({
			type: actions.ADD_TASK,
			value: newTaskResponseData.tasks,
		});
	}

	async function deleteTask(taskId) {
		// console.log("List deleted (log from list context module). listId: ", listId)
		const response = await fetch(`/lists/${selectedList.id}/tasks/${taskId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch({ type: actions.DELETE_TASK });
		return await response.json();
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
			value={{
				lists,
				tasks,
				setTasks,
				completeTask,
				createNewList,
				deleteList,
				createNewTask,
				deleteTask,
				selectedList,
				setSelectedList,
			}}
		>
			{children}
		</ListContext.Provider>
	);
}
