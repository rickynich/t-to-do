import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/popover";
import React from "react";

//context
import { useList } from "../Context/ListContext";

function NewListModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const newListTitle = useList().newListTitle;
    const updateNewListTitle = useList().updateNewListTitle;
	const createNewListHandler = useList().createNewListHandler;
    
	return (
		<>
			<Button onClick={onOpen}>Create List</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your new list</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>List title</FormLabel>
							<Input
								type="text"
								name="title"
								placeholder="List title"
								value={newListTitle}
								onChange={updateNewListTitle}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Popover>
							<PopoverTrigger>
								<Button onClick={createNewListHandler} mr={3}>
									Create
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverHeader>New list created!</PopoverHeader>
							</PopoverContent>
						</Popover>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default NewListModal;
