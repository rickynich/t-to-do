import React, { useState, useEffect } from "react";

//components
import TaskComponents from "../Task/Tasks";
import NewListModal from "./NewListModal";
import NewTaskModal from "../Task/NewTaskModal";
import NewCommentModal from "../Comments/NewCommentModal";
import EditCommentModal from "../Comments/EditCommentModal";
import EditListTitleModal from "./EditListTitleModal";

//Chakra
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
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
				<Flex m={1}>
					<ButtonGroup isAttached variant="outline">
						<Button
							id={loadedList.id}
							width="150px"
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
					</ButtonGroup>
				</Flex>
			);
		});

	const taskComponents =
		tasks &&
		tasks.map((task, index) => {
			// console.log("task", task, "task status", task.status);
			return (
				// <GridItem>
				<Container dir="column">
					<Flex m={1}>
						<Flex maxWidth="300px" textOverflow="wrap">
							{task.status === true ? (
								<Button
									id={task.id}
									onClick={() => {
										console.log("Task component: ", task);
										setSelectedTask(task);
										setComments(task.comments);
										// onToggle();
										toggle(index);
									}}
									width="300px"
									// height="70px"
									opacity=".3"
									isActive={true}
									// overflow="scroll"
								>
									<Flex width="100%">{task.title} (Completed)</Flex>
								</Button>
							) : (
								<Button
									id={task.id}
									width="300px"
									// height="70px"
									onClick={() => {
										setSelectedTask(task);
										setComments(task.comments);
										// onToggle();
										toggle(index);
									}}

									// overflow="break-word"
								>
									<Flex
										width="100%"
										flexWrap="wrap"
										flexDir="row"
										overflowWrap="break-word"
									>
										{task.title}
									</Flex>
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
					<Flex>
						{selectedTask.id == task.id && (
							<Collapse in={isCollapse}>
								<Box>{task.desc}</Box>
							</Collapse>
						)}
					</Flex>
					{/* </GridItem> */}
				</Container>
			);
		});

	const commentComponents =
		comments &&
		comments.map((comment) => {
			return (
				<Flex flexDir="column">
					<Text id={comment.id}>{comment.text}</Text>
					<ButtonGroup isAttached>
						<EditCommentModal
							comment={comment}
							onClick={() => {
								setSelectedComment(comment);
							}}
						/>
						<IconButton
							onClick={() => {
								deleteComment(comment.id);
							}}
							icon={<DeleteIcon />}
						/>
					</ButtonGroup>
				</Flex>
			);
		});

	return (
		// <Grid
		// 	justifyContent="center"
		// 	width="100%"
		// 	gridAutoColumns="auto"
		// 	gridTemplateColumns="repeat(3, 1fr)"
		// >
		<Flex m={4} justify="center">
			<Flex flexFlow="column wrap" align="center" width="30vh" m={8}>
				<NewListModal />
				<Text fontSize="xl" as="u">
					Lists:
				</Text>
				{listComponents}
			</Flex>
			{/* <GridItem width="50vh" alignContent="center"> */}
			<Flex flexDirection="column" m={8} align="center">
				<NewTaskModal />
				<Text fontSize="xl" as="u">
					Tasks:
				</Text>
				<Container>{taskComponents}</Container>
			</Flex>
			{/* </GridItem> */}
			<Flex direction="column" width="30vh" mt={8} align="center">
				{isCollapse && (
					<>
						<NewCommentModal />
						<Text fontSize="xl" as="u">
							Comments:
						</Text>
						<Container>{commentComponents}</Container>
					</>
				)}
			</Flex>
		</Flex>
		// </Grid>
	);
}
