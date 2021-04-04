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

function reducer(state, action) {
	switch (action.type) {
		case "add-list":
			console.log("State in reducer function: ", state, "incoming value: ",action.value)
			return {...state, lists: action.value}
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
        console.log("CREATE NEW LIST HIT. title:", title)
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
			dispatch({ type: "add-list", value: newListResponseData }); //change to redux naming conventions of constants at top
			return 
	}

	function completeTask(taskId) {
		setSelectedList();
	}

	return (
		<ListContext.Provider value={{ lists, completeTask, createNewList }}>
			{children}
		</ListContext.Provider>
	);
}
