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
			const response = await fetch('/lists/');
			const responseData = await response.json();
			setLists(responseData.lists);
		}
		fetchData();
	}, []);

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
			// const responseData = await response.json();
			return await response.json();

	}
	// function addTaskToList(listId) {

	// }
	function completeTask(taskId) {
		setSelectedList();
	}
	// console.log("Lists", lists)
	return (
		<ListContext.Provider value={{ lists, completeTask, createNewList }}>
			{children}
		</ListContext.Provider>
	);
}
