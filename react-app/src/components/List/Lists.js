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

	const loadedLists = useList(); //uses ListContext

	if (!loadedLists) return null;

	const listComponents = loadedLists.map((loadedList) => {
		console.log(loadedList);
		return (
            <Button id={loadedList.id} onClick={() => {
                setList(loadedList)
                // setTasks(loadedList.tasks)
            }
            }>
				{loadedList.title}
			</Button>

			// <h1>Hello</h1>
		);
	});
    console.log("Tasks loaded...?", tasks)
    
	const taskComponents = tasks.map((task) => {
		console.log(task);
		return (
			<Button
				id={task.id}
				// onClick={()=> setTasks(loadedList.tasks) }
			>
				{task.desc}
			</Button>

			// <h1>Hello</h1>
		);
	});
    

	return (
		<>
			<Text>Your Lists:</Text>
			<Flex>{listComponents}</Flex>
			<Flex>{taskComponents}</Flex>
			{/* {list && <TaskComponents list={list}>{TaskComponents}</TaskComponents>} */}
		</>
	);
}
