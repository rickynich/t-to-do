import React from "react";

//Chakra UI
import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Container, Flex } from "@chakra-ui/layout";
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

//context
import { useList } from "../Context/ListContext";

function EditCommentModal(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const newCommentText = useList().newCommentText;

	const updateNewCommentText = useList().updateNewCommentText;
	const editComment = useList().editComment;

	const loadedComment = props.comment;

	return (
		<Flex>
			<Button onClick={onOpen} variant="link" fontSize="14px">Edit</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit your Comment</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Comment text</FormLabel>
							<Input
								type="text"
								name="text"
								placeholder={loadedComment.text}
								value={newCommentText}
								onChange={updateNewCommentText}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Popover>
							<PopoverTrigger>
								<Button
									onClick={() => {
										editComment(loadedComment.id, newCommentText);
									}}
									mr={3}
								>
									Submit Edit
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverHeader>Comment has been edited</PopoverHeader>
							</PopoverContent>
						</Popover>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default EditCommentModal;
