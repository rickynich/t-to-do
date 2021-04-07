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
		case actions.UPDATE_TASK:
			return { ...state };
		case actions.ADD_COMMENT:
			return { ...state, comments: action.value };
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
	const [newListTitle, setNewListTitle] = useState();
	const [newTaskTitle, setNewTaskTitle] = useState();
	const [newTaskDesc, setNewTaskDesc] = useState();
	const [newCommentText, setNewCommentText] = useState();

	const initialValue = { lists, tasks, comments };
	const [state, dispatch] = useReducer(reducer, initialValue); //add initial state to have current lists

	//initial load
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/lists/");
			const responseData = await response.json();
			setLists(responseData.lists);
			setTasks(responseData.tasks); //for all tasks 
			// setComments(responseData.comments); //for all comments 
			console.log("INITIAL LOAD. response data :", responseData);
		}
		fetchData();
	}, []);

	//for state change
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/lists/");
			const responseData = await response.json();
			setLists(responseData.lists);
			// setTasks(responseData.tasks); //for all tasks 
			// setComments(responseData.comments); //for all comments 
			console.log("INITIAL LOAD. response data :", responseData);
		}
		fetchData();
	}, [state]);

	//tasks updater
	useEffect(() => {
		async function fetchTasksData() {
			const response = await fetch(`/lists/${selectedList.id}/tasks`);
			const responseData = await response.json();
			setTasks(responseData.tasks);
			setComments(responseData.tasks.comments);
		}
		fetchTasksData();
	}, [state]);

	//comments updater
	// useEffect(() => {
	// 	async function fetchCommentsData() {
	// 		console.log(
	// 			`In useEffect updater for comments: /lists/${selectedList.id}/tasks/${selectedTask.id}/comments`
	// 		);
	// 		const response = await fetch(
	// 			`/lists/${selectedList.id}/tasks/${selectedTask.id}/comments`
	// 		);
	// 		// const response = await fetch(`/lists/1/tasks/1/comments`);
	// 		const responseData = await response.json();
	// 		console.log("responseData.comments", responseData.comments);
	// 		setComments(responseData.comments);
	// 	}
	// 	fetchCommentsData();
	// 	console.log("New comments set after useEffect:", comments);
	// }, [state]);

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
		const response = await fetch(`/lists/${selectedList.id}/tasks/${taskId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch({ type: actions.DELETE_TASK });
		return await response.json();
	}
	
	//for changing task status
	async function markTaskAsComplete(taskId) {
			const response = await fetch(`/lists/${selectedList.id}/tasks/${taskId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"status": true
				}),
		});
		dispatch({ type: actions.UPDATE_TASK });
		return await response.json();
	}

	//Comment methods
	async function createNewComment(taskId, text) {
		const response = await fetch(`/lists/${selectedList.id}/tasks/${taskId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text,
			}),
		});
		const newCommentResponseData = await response.json();
		// console.log("NEW COMMENT RESPONSE DATA in useEffect", newCommentResponseData)
		return dispatch({
			type: actions.ADD_COMMENT,
			value: newCommentResponseData.comments,
		});
	}
	async function deleteComment(commentId) {
		// console.log("List deleted (log from list context module). listId: ", listId)
		const response = await fetch(
			`/lists/${selectedList.id}/tasks/${selectedTask.id}/comments/${commentId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		dispatch({ type: actions.DELETE_COMMENT });
		return await response.json();
	}

	//new List handling
	const updateNewListTitle = (e) => {
		setNewListTitle(e.target.value);
	};
	const createNewListHandler = () => {
		createNewList(newListTitle);
	};
		//new Task handling
	const updateNewTaskTitle = (e) => {
		setNewTaskTitle(e.target.value);
	};
	const updateNewTaskDesc = (e) => {
		setNewTaskDesc(e.target.value);
	};
	const createNewTaskHandler = () => {
		createNewTask(selectedList.id, newTaskTitle, newTaskDesc);
	};

	//new Comment handling
	const updateNewCommentText = (e) => {
		setNewCommentText(e.target.value);
	};
	const createNewCommentHandler = () => {
		createNewComment(selectedTask.id, newCommentText);
	};

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
				comments,
				setComments,
				selectedList,
				setSelectedList,
				selectedTask,
				setSelectedTask,
				// selectedComment,
				// setSelectedComment,
				createNewList,
				deleteList,
				createNewTask,
				deleteTask,
				markTaskAsComplete,
				createNewComment,
				deleteComment,
				newListTitle,
				setNewListTitle,
				updateNewListTitle,
				createNewListHandler,
				newTaskTitle,
				setNewTaskTitle,
				newTaskDesc,
				setNewTaskDesc,
				updateNewTaskTitle,
				updateNewTaskDesc,
				createNewTaskHandler,
				updateNewCommentText,
				createNewCommentHandler,
				newCommentText,
				setNewCommentText,
			}}
		>
			{children}
		</ListContext.Provider>
	);
}
