import React, { useState, useEffect } from "react";

//components
import TaskComponents from "../Task/Tasks";
import NewListModal from "./NewListModal";
import NewTaskModal from "../Task/NewTaskModal";
import NewCommentModal from "../Comments/NewCommentModal";

//Chakra
import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import {
	Collapse,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

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
	const newCommentText = useList().newCommentText;
	const setNewCommentText = useList().setNewCommentText;
	const updateNewCommentText = useList().updateNewCommentText;
	const createNewCommentText = useList().createNewCommentText;
	const createNewCommentHandler = useList().createNewCommentHandler;

	if (!lists) return null;

	const listComponents =
		lists &&
		lists.map((loadedList) => {
			return (
				<GridItem>
					<Button
						id={loadedList.id}
						// isActive="true"
						outline="none"
						onClick={() => {
							setSelectedList(loadedList);
							setTasks(loadedList.tasks); //sets list tasks
							setComments(loadedList.tasks[0].comments); //sets view to comments for first task
						}}
					>
						{loadedList.title}
					</Button>
					<Button
						onClick={() => {
							deleteList(loadedList.id);
						}}
					>
						<DeleteIcon />
					</Button>
				</GridItem>
			);
		});

	const taskComponents =
		tasks &&
		tasks.map((task) => {
			console.log("task", task, "task status", task.status);
			return (
				<GridItem>
					<Container>
						{task.status === true ? (
							<Button
								id={task.id}
								onClick={() => {
									setSelectedTask(task);
									setComments(task.comments);
									onToggle();
								}}
								opacity=".2"
							>
								{task.title}
							</Button>
						) : (
							<Button
								id={task.id}
								onClick={() => {
									setSelectedTask(task);
									setComments(task.comments);
									onToggle();
								}}
							>
								{task.title}
							</Button>
						)}
						<Collapse in={isOpen}>
							<Box>{task.desc}</Box>
						</Collapse>
					</Container>
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
					</Button>
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
				<NewCommentModal />
				<Container>{commentComponents}</Container>
			</Flex>
		</Grid>
	);
}
