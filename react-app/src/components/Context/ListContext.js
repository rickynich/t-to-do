import React, { useContext, useState, useEffect } from "react";

const ListContext = React.createContext({
    lists: [],
    createNewList: () => {},
	addTaskToList: () => {},
	completeTask: (id) => {},
});

export function useList() {
	return useContext(ListContext);
}

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const [selectedList, setSelectedList] = useState();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/lists/");
			const responseData = await response.json();
			setLists(responseData.lists);
		}
		fetchData();
	}, []);

	// function createNewList()) {

	// }
	// function addTaskToList(listId) {

	// }
	function completeTask(taskId) {
		setSelectedList();
	}
	// console.log("Lists", lists)
	return (
		<ListContext.Provider value={{ lists, completeTask }}>
			{children}
		</ListContext.Provider>
	);
}
