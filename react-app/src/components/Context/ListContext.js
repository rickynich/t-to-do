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
	DELETE_TASK: "DELETE_TASK",
	ADD_COMMENT: "ADD_COMMENT",
	DELETE_COMMENT: "DELETE_COMMENT",
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_LIST:
			return { ...state, lists: action.value };
		case actions.DELETE_LIST:
			return { ...state };
		case actions.ADD_TASK:
			return { ...state, tasks: action.value };
		case actions.DELETE_TASK:
			return { ...state };
		case actions.ADD_COMMENT:
			return { ...state, tasks: action.value };
		case actions.DELETE_COMMENT:
				return { ...state };
		default:
			return state;
	}
}

export function ListProvider({ children }) {
	const [lists, setLists] = useState([]);
	const [tasks, setTasks] = useState(["default task"]);
	const [comments, setComments] = useState(["default comment"]);
	const [selectedList, setSelectedList] = useState([
		{ title: "default list", tasks: [{ title: "default task" }] },
	]);
	const [selectedTask, setSelectedTask] = useState([
		{ task: "default task", comments: [{ title: "default task" }] },
	]);
	const [selectedComment, setSelectedComment] = useState([]);

	const initialValue = { lists, tasks };
	const [state, dispatch] = useReducer(reducer, initialValue); //add initial state to have current lists

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
	//INCOMPLETE:
	function completeTask(taskId) {
		setSelectedList();
	}
	
	//Comment methods
	async function createNewComment(text) {
		const response = await fetch(
			`/lists/${selectedList.id}/tasks/${selectedTask.id}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text,
				}),
			}
		);
		const newCommentResponseData = await response.json();
		return dispatch({
			type: actions.ADD_COMMENT,
			value: newCommentResponseData.comments,
		});
	}
	// async function deleteComment(commentId) {
	// 	// console.log("List deleted (log from list context module). listId: ", listId)
	// 	const response = await fetch(
	// 		`/lists/${selectedList.id}/tasks/${selectedTask.id}/comments/${commentId}`,
	// 		{
	// 			method: "DELETE",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);
	// 	dispatch({ type: actions.DELETE_COMMENT });
	// 	return await response.json();
	// }
	
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
				comments,
				selectedList,
				setSelectedList,
				selectedTask,
				setSelectedTask,
				setTasks,
				completeTask,
				createNewList,
				deleteList,
				createNewTask,
				deleteTask,
				createNewComment,
			}}
		>
			{children}
		</ListContext.Provider>
	);
}
