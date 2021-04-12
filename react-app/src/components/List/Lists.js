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

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
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
		if (index >= 0 && !isCollapse) {
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
			return (
				<Container dir="column">
					<Flex m={1}>
						<Flex maxWidth="400px">
							<ButtonGroup isAttached variant="outline">
								<Box
									id={task.id}
									width="300px"
									onClick={() => {
										setSelectedTask(task);
										setComments(task.comments);
										toggle(index);
									}}
									as="button"
									height="100%"
									lineHeight="1.2"
									border="1px"
									px="8px"
									borderRadius={2}
									fontSize="16px"
									fontWeight="semibold"
									bg="gray.50"
									borderColor="#ccd0d5"
									color="#4b4f56"
									_hover={{ bg: "#ebedf0" }}
									_active={{
										bg: "#dddfe2",
										transform: "scale(0.98)",
										borderColor: "#bec3c9",
									}}
									_focus={{
										boxShadow:
											"0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
									}}
								>
									{task.status === true ? (
										<Flex width="100%" opacity=".3">
											{task.title} (Completed)
										</Flex>
									) : (
										<Flex width="100%">{task.title}</Flex>
									)}
								</Box>
								<IconButton
									onClick={() => {
										setSelectedTask(task);
										markTaskAsComplete(task.id);
									}}
									icon={<CheckIcon />}
									borderRadius={2}
								></IconButton>
								<IconButton
									onClick={() => {
										deleteTask(task.id);
									}}
									_hover={{ bg: "red.100" }}
									icon={<DeleteIcon />}
									borderRadius={2}
								></IconButton>
							</ButtonGroup>
						</Flex>
					</Flex>
					<Flex width="100%" >
						{selectedTask.id == task.id && (
							<Collapse in={isCollapse}>
								<Box maxWidth="100%" m={3} fontSize="15px">
									<Text as="u">Description:</Text>
									{"\n"}
									{task.desc}
								</Box>
							</Collapse>
						)}
					</Flex>
				</Container>
			);
		});

	const commentComponents =
		comments &&
		comments.map((comment) => {
			return (
				<Flex flexDir="column" fontSize="15px">
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
							_hover={{ bg: "red.100" }}
							icon={<DeleteIcon />}
						/>
					</ButtonGroup>
				</Flex>
			);
		});

	return (
		<Flex m={4} justify="center">
			<Flex flexFlow="column wrap" align="center" width="30vh" m={8}>
				<NewListModal />
				<Text fontSize="xl" as="u">
					Lists:
				</Text>
				{listComponents}
			</Flex>
			<Flex flexDirection="column" m={8} align="center">
				<NewTaskModal />
				<Text fontSize="xl" as="u">
					Tasks:
				</Text>
				<Container>{taskComponents}</Container>
			</Flex>
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
	);
}
