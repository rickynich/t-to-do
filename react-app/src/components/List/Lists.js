import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import TaskComponents from "../Task/Tasks";

//Chakra

//context
import { useList } from "../Context/ListContext";

export default function ListsList() {
	const [list, setList] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [comments, setComments] = useState([]);

	const loadedLists = useList().lists; //uses ListContext

	if (!loadedLists) return null;

	const listComponents = loadedLists.map((loadedList) => {
		return (
			<Button id={loadedList.id}
				onClick={() => {
					setList(loadedList)
					setTasks(loadedList.tasks)
            	}
            }>
				{loadedList.title}
			</Button>
		);
	});
    console.log("Tasks loaded...?", tasks)
    
	const taskComponents = tasks.map((task) => {
		console.log("task in task component", task);
		return (
			<Button
				id={task.id}
				onClick={()=> setComments(task.comments) }
			>
				{task.desc}
			</Button>
		);
	});
	const commentComponents = comments.map((comment) => {
		return (
			<Button
				id={comment.id}
			>
				{comment.text}
			</Button>
		);
	});
    

	return (
		<Flex justifyContent="center" width="70%">
			<Flex direction="column">
				<Text>Lists:</Text>
				<Button size="small">Add New List</Button>
				<Flex>{listComponents}</Flex>
			</Flex>
			<Flex direction="column">
				<Text>Tasks:</Text>
				<Flex>{taskComponents}</Flex>
			</Flex>
			<Flex direction="column">
				<Text>Comments:</Text>
				<Flex>{commentComponents}</Flex>
			</Flex>
			{/* {list && <TaskComponents list={list}>{TaskComponents}</TaskComponents>} */}
		</Flex>
	);
}
