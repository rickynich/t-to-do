import React, { useState, useEffect } from "react";

//components
import TaskComponents from "../Task/Tasks";
import NewListModal from "./NewListModal";
import NewTaskModal from "../Task/NewTaskModal";
import NewCommentModal from "../Comments/NewCommentModal";

//Chakra
import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
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
	const markTaskAsComplete = useList().markTaskAsComplete;
	const createNewComment = useList().createNewComment;
	const deleteComment = useList().deleteComment;
	// const newListTitle = useList().newListTitle
	// const setNewListTitle  = useList().setNewListTitle
	// const newTaskTitle  = useList().newTaskTitle
	// const setNewTaskTitle  = useList().setNewTaskTitle
	// const newTaskDesc  = useList().newTaskDesc
	// const setNewTaskDesc  = useList().setNewTaskDesc
	const newCommentText = useList().newCommentText;
	const setNewCommentText = useList().setNewCommentText;
	const updateNewCommentText = useList().updateNewCommentText;
	const createNewCommentText = useList().createNewCommentText;
	const createNewCommentHandler = useList().createNewCommentHandler;
	
	if (!lists) return null;

	// //new Comment handling
	// const updateNewCommentText = (e) => {
	// 	setNewCommentText(e.target.value);
	// };
	// const createNewCommentHandler = () => {
	// 	createNewComment(selectedTask.id, newCommentText);
	// };

	const listComponents = lists.map((loadedList) => {
		return (
			<GridItem>
				<Button
					id={loadedList.id}
					// isActive="true"
					outline="none"
					onClick={() => {
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
				<GridItem>
					<Menu>
						<MenuButton
							id={task.id}
							onClick={() => {
								setSelectedTask(task);
								setComments(task.comments);
							}}
						>
							{task.title}
						</MenuButton>
						<MenuList>
							<MenuItem> {task.desc}</MenuItem>
						</MenuList>
						<Button
							onClick={() => {
								markTaskAsComplete(task.id);
							}}
							// add for on hover - "Mark task as complete"
						>
							<CheckIcon />
						</Button>
						<Button
							onClick={() => {
								deleteTask(task.id);
							}}
						>
							<DeleteIcon />
							Delete
						</Button>
						<NewCommentModal />
					</Menu>
				</GridItem>
			);
		});

	const commentComponents =
		comments &&
		comments.map((comment) => {
			// console.log("COMMENT IN commentComponents!!", comment)
			return (
				<Flex>
					<Text id={comment.id}>{comment.text}</Text>
					<Button
					// for edit comment
					>
						<EditIcon />
					</Button>
					<Button
						onClick={() => {
							deleteComment(comment.id);
						}}
					>
						<DeleteIcon />
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
				<NewListModal />
				{listComponents}
			</Flex>
			<GridItem colSpan={2} width="50vh" alignContent="center">
				<Text>Tasks:</Text>
				<NewTaskModal />
				<Container>{taskComponents}</Container>
			</GridItem>
			<Flex direction="column" width="30vh">
				<Text>Comments:</Text>
				<Input
					type="text"
					name="title"
					placeholder="New comment text here"
					value={newCommentText}
					onChange={updateNewCommentText}
				></Input>
				<Button size="small" onClick={createNewCommentHandler}>
					Add New Comment
				</Button>
				<NewCommentModal />
				<Container>{commentComponents}</Container>
			</Flex>
		</Grid>
	);
}
