import React, { useState, useEffect } from "react";
import TaskComponents from "../Task/Tasks";

//Chakra
import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
	// const [tasks, setTasks] = useState([]);
	const [comments, setComments] = useState([]);
	const [newListTitle, setNewListTitle] = useState();
	const [newTaskTitle, setNewTaskTitle] = useState();
	const [newTaskDesc, setNewTaskDesc] = useState();

	//uses ListContext:
	const loadedLists = useList().lists;
	const selectedList = useList().selectedList;
	const setSelectedList = useList().setSelectedList;
	const tasks = useList().tasks;
	const setTasks = useList().setTasks;
	const createNewList = useList().createNewList;
	const deleteList = useList().deleteList;
	const createNewTask = useList().createNewTask;
	const deleteTask = useList().deleteTask;

	if (!loadedLists) return null;

	const listComponents = loadedLists.map((loadedList) => {
		return (
			<Flex>
				<Button
					id={loadedList.id}
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
			</Flex>
		);
	});
	const taskComponents =
		tasks &&
		tasks.map((task) => {
			return (
				<>
					<Button id={task.id} onClick={() => setComments(task.comments)}>
						{task.title}
					</Button>
					<Button
						onClick={() => {
							deleteTask(task.id);
						}}
					>
						Delete
					</Button>
				</>
			);
		});
	const commentComponents = comments.map((comment) => {
		return <Button id={comment.id}>{comment.text}</Button>;
	});

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

	return (
		<Flex justifyContent="center" width="100%">
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
				<Flex direction="column">{listComponents}</Flex>
			</Flex>
			<Flex direction="column" width="30vh">
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
				<Flex direction="column">{taskComponents}</Flex>
			</Flex>
			<Flex direction="column" width="30vh">
				<Text>Comments:</Text>
				<Flex direction="column">{commentComponents}</Flex>
			</Flex>
		</Flex>
	);
}
