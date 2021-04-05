import React, { useState, useEffect } from "react";
import TaskComponents from "../Task/Tasks";

//Chakra
import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/react";

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
	const [list, setList] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [comments, setComments] = useState([]);
	const [newListTitle, setNewListTitle] = useState();
	const [newTaskDesc, setNewTaskDesc] = useState();

	console.log("selected list:", list);

	//uses ListContext:
	const loadedLists = useList().lists;
	const createNewList = useList().createNewList;
	const deleteList = useList().deleteList;
	const createNewTask = useList().createNewTask;

	if (!loadedLists) return null;

	const listComponents = loadedLists.map((loadedList) => {
		return (
			<Flex>
				<Button
					id={loadedList.id}
					onClick={() => {
						setList(loadedList);
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
	// console.log("Tasks loaded...?", tasks);

	const taskComponents = tasks.map((task) => {
		console.log("task in task component", task);
		return (
			<Button id={task.id} onClick={() => setComments(task.comments)}>
				{task.desc}
			</Button>
		);
	});
	const commentComponents = comments.map((comment) => {
		return <Button id={comment.id}>{comment.text}</Button>;
	});
	const updateNewListTitle = (e) => {
		setNewListTitle(e.target.value);
	};

	const createNewListHandler = () => {
		console.log("In new List handler, newListTitle:", newListTitle);
		createNewList(newListTitle);
	};
	const updateNewTaskDesc = (e) => {
		setNewTaskDesc(e.target.value);
	};

	const createNewTaskHandler = () => {
		console.log("In new Task handler:", newTaskDesc);
		createNewTask(list.id, newTaskDesc);
	};

	return (
		<Flex justifyContent="center" width="100%">
			<Flex direction="column" width="30vh">
				<Text>Tasks:</Text>
				<Input
					type="text"
					name="title"
					// width="170px"
					placeholder="New list title here"
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
