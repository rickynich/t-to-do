import React, { useState, useEffect } from "react";
import TaskComponents from "../Task/Tasks";

//Chakra
import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
	const [newListTitle, setNewListTitle] = useState();
	const [newTaskTitle, setNewTaskTitle] = useState();
	const [newTaskDesc, setNewTaskDesc] = useState();
	const [newCommentText, setNewCommentText] = useState();

	//uses ListContext:
	const lists = useList().lists;
	const tasks = useList().tasks;
	const setTasks = useList().setTasks;
	const comments = useList().comments;
	const setComments = useList().setComments;
	const selectedList = useList().selectedList;
	const setSelectedList = useList().setSelectedList;
	const selectedTask = useList().selectedTask;
	const setSelectedTask = useList().setSelectedTask;
	const createNewList = useList().createNewList;
	const deleteList = useList().deleteList;
	const createNewTask = useList().createNewTask;
	const deleteTask = useList().deleteTask;
	const createNewComment = useList().createNewComment;
	const deleteComment = useList().deleteComment;

	if (!lists) return null;

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

	const listComponents = lists.map((loadedList) => {
		return (
			<GridItem>
				<Button
					id={loadedList.id}
					// isActive="true"
					outline="none"
					onClick={() => {
						// setList(loadedList);
						setSelectedList(loadedList);
						setTasks(loadedList.tasks);
					}}

				>
					{loadedList.title}
				</Button>
				<Button
					onClick={() => {
						deleteList(loadedList.id);
					}}
				>
					Delete
				</Button>
			</GridItem>
		);
	});
	
	const taskComponents =
		tasks &&
		tasks.map((task) => {
			return (
				<Flex>
					<Button id={task.id} onClick={() => {
						setSelectedTask(task);
						setComments(task.comments)
					}}>
						{task.title}
					</Button>
					<Button
						onClick={() => {
							deleteTask(task.id);
						}}
					>
						Delete
					</Button>
				</Flex>
			);
		});
	
	const commentComponents = comments.map((comment) => {
		return (
			<Flex>
				<Text id={comment.id}>
					{comment.text}
				</Text>
				<Button
					onClick={() => {
						deleteComment(comment.id);
					}}
				>
					Delete
				</Button>
			</Flex>
		);
		});



	return (
		<Grid
			justifyContent="center"
			width="100%"
			gridAutoColumns="auto"
			gridTemplateColumns="repeat(4, 1fr)"
		>
			<Flex flexFlow="column wrap" align="space-between" width="30vh">
				<Text>Lists:</Text>
				<Input
					type="text"
					name="title"
					// width="170px"
					placeholder="New list title here"
					value={newListTitle}
					onChange={updateNewListTitle}
				></Input>
				<Button size="small" onClick={createNewListHandler}>
					Add New List
				</Button>
				{listComponents}
			</Flex>
			<GridItem colSpan={2} width="30vh" alignContent="center">
				<Text>Tasks:</Text>
				<Input
					type="text"
					name="title"
					// width="170px"
					placeholder="New task title here"
					value={newTaskTitle}
					onChange={updateNewTaskTitle}
				></Input>
				<Input
					type="text"
					name="title"
					// width="170px"
					placeholder="New task description here"
					value={newTaskDesc}
					onChange={updateNewTaskDesc}
				></Input>
				<Button size="small" onClick={createNewTaskHandler}>
					Add New Task
				</Button>
				{taskComponents}
			</GridItem>
			<Flex direction="column" width="30vh">
				<Text>Comments:</Text>
				<Input
					type="text"
					name="title"
					// width="170px"
					placeholder="New comment text here"
					value={newCommentText}
					onChange={updateNewCommentText}
				></Input>
				<Button size="small" onClick={createNewCommentHandler}>
					Add New Comment
				</Button>
				{commentComponents}
			</Flex>
		</Grid>
	);
}
