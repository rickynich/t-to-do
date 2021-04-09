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
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@chakra-ui/popover";
import React from "react";

//context
import { useList } from "../Context/ListContext";

function EditListTitleModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const editListTitle = useList().editListTitle;
	const newListTitle = useList().newListTitle;
	const updateNewListTitle = useList().updateNewListTitle;
	const createNewListHandler = useList().createNewListHandler;

	return (
		<>
			<Button onClick={onOpen}>EDIT LIST TITLE</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your list title</ModalHeader>
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
								<Button onClick={editListTitle} mr={3}>
									Submit change
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverHeader>List title edited!</PopoverHeader>
							</PopoverContent>
						</Popover>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditListTitleModal;
