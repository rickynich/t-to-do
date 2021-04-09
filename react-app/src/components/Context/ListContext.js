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
	UPDATE_TASK: "UPDATE_TASK",
	ADD_COMMENT: "ADD_COMMENT",
	DELETE_COMMENT: "DELETE_COMMENT",
	EDIT_COMMENT: "EDIT_COMMENT",
};

function reducer(state, action) {
	switch (action.type) {
		case actions.ADD_LIST:
			return { ...state, lists: action.value };
		case actions.EDIT_LIST:
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
		case actions.EDIT_COMMENT:
			return { ...state, comments: action.value };
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
	const [selectedTask, setSelectedTask] = useState([]);
	const [selectedComment, setSelectedComment] = useState({});
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
			console.log(
				"INITIAL LOAD. selected task:",
				selectedTask,
				responseData.tasks[0]
			);
		}
		fetchData();
	}, []);

	//updates list
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/lists/");
			const responseData = await response.json();
			setLists(responseData.lists);
		}
		fetchData();
	}, [state]);

	//tasks updater
	useEffect(() => {
		async function fetchTasksData() {
			//gets all tasks
			const response = await fetch(`/lists/${selectedList.id}/tasks`);
			const responseData = await response.json();
			setTasks(responseData.tasks);

			//gets an individual task from the backend
			const response2 = await fetch(
				`/lists/${selectedList.id}/tasks/${selectedTask.id}`
			);
			const responseData2 = await response2.json();
			setComments(responseData2.comments);
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
		//edit a list title 
		async function editListTitle(title) {
			const response = await fetch(`/lists/${selectedList.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
				}),
			});
			const editListResponseData = await response.json();
			console.log("In edit List put request function",  title)
			return dispatch({
				type: actions.EDIT_LIST,
				value: editListResponseData.title,
			});
		}
		//new List handling
		const updateNewListTitle = (e) => {
			setNewListTitle(e.target.value);
		};
		const createNewListHandler = () => {
			createNewList(newListTitle);
		};

	//Task methods
		//create new task
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
		//delete task
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
		//changes task status
		async function markTaskAsComplete(taskId) {
			const response = await fetch(`/lists/${selectedList.id}/tasks/${taskId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status: true,
				}),
			});
			const taskResponseData = await response.json();
			// console.log("taskResponseDate", taskResponseData)
			return dispatch({ type: actions.UPDATE_TASK, value: taskResponseData.status });
		}

	//Comment methods
		//Create a new comment
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
			return dispatch({
				type: actions.ADD_COMMENT,
				value: newCommentResponseData.comments,
			});
		}
		//delete a comment
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
			dispatch({ type: actions.DELETE_COMMENT, value: selectedTask.comments });
			return await response.json();
		}
		//edit a comment 
		async function editComment(commentId, text) {
			const response = await fetch(`/lists/${selectedList.id}/tasks/${selectedTask.id}/comments/${commentId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text,
				}),
			});
			const editCommentResponseData = await response.json();
			console.log("In edit comment put request function", commentId, text)
			return dispatch({
				type: actions.EDIT_COMMENT,
				value: editCommentResponseData.comments,
			});
		}
		// const editCommentHandler = () => {
		// 	editComment(selectedComment, newCommentText);
		// };



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
				setSelectedComment,
				deleteComment,
				editComment,
				// editCommentHandler,
				newListTitle,
				editListTitle,
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
