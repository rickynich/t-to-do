import React, { useContext, useState, useEffect } from "react";

const ListContext = React.createContext();
const ListUpdateContext = React.createContext(); // to set the selected list

export function useList() {
	return useContext(ListContext);
}
export function useListSelect() {
	return useContext(ListUpdateContext);
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

	function addTaskToList(listId) {
        
	}
	function completeTask(taskId) {
        
	}
	// console.log("Lists", lists)
	return (
		<ListContext.Provider value={lists}>
			<ListUpdateContext.Provider >{children}</ListUpdateContext.Provider>
		</ListContext.Provider>
	);
}
