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

	const loadedLists = useList(); //uses ListContext

	if (!loadedLists) return null;

	const listComponents = loadedLists.map((loadedList) => {
		// console.log(loadedList);
		return (
			<Button id={loadedList.id}
				onClick={() => {
					setList(loadedList)
					setTasks(loadedList.tasks)
					// console.log("On click loadedList", loadedList)
					// console.log("On click loadedList task", loadedList.tasks[0].desc)
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

			// <h1>Hello</h1>
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
		<Flex>
			<Text>Your Lists:</Text>
			<Flex>{listComponents}</Flex>
			<Flex>{taskComponents}</Flex>
			<Flex>{commentComponents}</Flex>
			{/* {list && <TaskComponents list={list}>{TaskComponents}</TaskComponents>} */}
		</Flex>
	);
}
