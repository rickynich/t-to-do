
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

	//uses ListContext:
	const loadedLists = useList().lists; 
	const createNewList = useList().createNewList

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
	const updateNewListTitle = (e) => {
			setNewListTitle(e.target.value);
	};

	const createNewListHandler = () => {
		console.log("In new List handler, newListTitle:", newListTitle)
		createNewList(newListTitle)
	}

	return (
		<Flex justifyContent="center" width="70%">
			<Flex direction="column">
				<Text>Lists:</Text>
				<Flex>
					{/* <form onSubmit={createNewListHandler}> */}
						<Input
							type="text"
							name="title"
							placeholder="New list title here"
							value={newListTitle}
							onChange={updateNewListTitle}
						></Input>
						<Button size="small" onClick={createNewListHandler}>
							Add New List
						</Button>
					{/* </form> */}
				</Flex>
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
