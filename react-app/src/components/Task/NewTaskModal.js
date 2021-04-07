import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Container } from "@chakra-ui/layout";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@chakra-ui/popover";
import React from "react";

//context
import { useList } from "../Context/ListContext";

function NewTaskModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const newTaskTitle = useList().newTaskTitle;
	const newTaskDesc = useList().newTaskDesc;
	const updateNewTaskTitle = useList().updateNewTaskTitle;
	const updateNewTaskDesc = useList().updateNewTaskDesc;
	const createNewTaskHandler = useList().createNewTaskHandler;

	return (
		<Container>
			<Button onClick={onOpen}>Create New Task</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your new task</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Task title</FormLabel>
							<Input
								type="text"
								name="title"
								placeholder="Task title"
								value={newTaskTitle}
								onChange={updateNewTaskTitle}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Task description</FormLabel>
							<Input
								type="text"
								name="desc"
								placeholder="Task description"
								value={newTaskDesc}
								onChange={updateNewTaskDesc}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Popover>
							<PopoverTrigger>
								<Button onClick={createNewTaskHandler} mr={3}>
									Create
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverHeader>New task created!</PopoverHeader>
							</PopoverContent>
						</Popover>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Container>
	);
}

export default NewTaskModal;
