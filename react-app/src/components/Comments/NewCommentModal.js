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

function NewCommentModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const newCommentText= useList().newCommentText;
	const updateNewCommentText = useList().updateNewCommentText;
	const createNewCommentHandler = useList().createNewCommentHandler;

	return (
		<Container>
			<Button onClick={onOpen}>Create Comment</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your new Comment</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Comment text</FormLabel>
							<Input
								type="text"
								name="text"
								placeholder="Comment description"
								value={newCommentText}
								onChange={updateNewCommentText}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Popover>
							<PopoverTrigger>
								<Button onClick={createNewCommentHandler} mr={3}>
									Create
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverHeader>New Comment created!</PopoverHeader>
							</PopoverContent>
						</Popover>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Container>
	);
}

export default NewCommentModal;
