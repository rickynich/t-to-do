import React, { useState, useEffect } from "react";

//components
import TaskComponents from "../Task/Tasks";
import NewListModal from "./NewListModal";
import NewTaskModal from "../Task/NewTaskModal";
import NewCommentModal from "../Comments/NewCommentModal";
import EditCommentModal from "../Comments/EditCommentModal";
import EditListTitleModal from "./EditListTitleModal";

//Chakra
import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { Collapse, FormControl } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
	// const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

	//uses ListContext:
	const lists = useList().lists;
	const tasks = useList().tasks;
	const setTasks = useList().setTasks;
	const comments = useList().comments;
	const setComments = useList().setComments;
	const setSelectedList = useList().setSelectedList;
	const selectedTask = useList().selectedTask;
	const setSelectedTask = useList().setSelectedTask;
	const deleteList = useList().deleteList;
	const deleteTask = useList().deleteTask;
	const markTaskAsComplete = useList().markTaskAsComplete;
	const deleteComment = useList().deleteComment;
	const selectedComment = useList().selectedComment;
	const setSelectedComment = useList().setSelectedComment;
	const [isCollapse, setCollapse] = useState(false);

	if (!lists) return null;

	const toggle = (index) => {
		if (index) {
			// to show the rest of the elements
			setCollapse(!isCollapse);
		}
		if (index === 0) {
			//  to show first item
			setCollapse(!isCollapse);
		}
	};

	const listComponents =
		lists &&
		lists.map((loadedList) => {
			return (
				<GridItem>
					<Flex>
						<Button
							id={loadedList.id}
							// isActive="true"
							outline="none"
							onClick={() => {
								setSelectedList(loadedList);
								setTasks(loadedList.tasks); //sets list tasks
							}}
						>
							{loadedList.title}
						</Button>
						<EditListTitleModal />
						<Button
							onClick={() => {
								deleteList(loadedList.id);
							}}
						>
							<DeleteIcon />
						</Button>
					</Flex>
				</GridItem>
			);
		});

	const taskComponents =
		tasks &&
		tasks.map((task, index) => {
			// console.log("task", task, "task status", task.status);
			return (
				<GridItem>
					<Flex>
						<Flex maxWidth="300px" textOverflow="wrap">
							{task.status === true ? (
								<Button
									id={task.id}
									onClick={() => {
										setSelectedTask(task);
										setComments(task.comments);
										// onToggle();
										toggle(index);
									}}
									width="300px"
									opacity=".3"
									isActive={true}
									overflow="hidden"
								>
									{task.title} (Completed)
								</Button>
							) : (
								<Button
									id={task.id}
									width="300px"
									onClick={() => {
										setSelectedTask(task);
										setComments(task.comments);
										// onToggle();
										toggle(index);
									}}
									overflow="break-word"
								>
									{task.title}
								</Button>
							)}
						</Flex>
						<Button
							onClick={() => {
								setSelectedTask(task);
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
					</Flex>
					{selectedTask.id == task.id && (
						<Collapse in={isCollapse}>
							<Box>{task.desc}</Box>
						</Collapse>
					)}
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
						onClick={() => {
							setSelectedComment(comment);
							console.log("Selected comment: ", selectedComment, comment);
						}}
					>
						<EditCommentModal comment={comment} />
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
			gridTemplateColumns="repeat(3, 1fr)"
		>
			<Flex flexFlow="column wrap" align="space-between" width="30vh">
				<Text>Lists:</Text>
				<NewListModal />
				{listComponents}
			</Flex>
			<GridItem width="50vh" alignContent="center">
				<Text>Tasks:</Text>
				<NewTaskModal />
				<Container>{taskComponents}</Container>
			</GridItem>
			<Flex direction="column" width="30vh">
				{isCollapse && (
					<>
						<Text>Comments:</Text>
						<NewCommentModal />
						<Container>{commentComponents}</Container>
					</>
				)}
			</Flex>
		</Grid>
	);
}
