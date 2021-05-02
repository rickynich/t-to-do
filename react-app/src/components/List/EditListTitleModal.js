import React from "react";

//Chakra UI
import { Button } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
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

//context
import { useList } from "../Context/ListContext";

function EditListTitleModal(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const editListTitle = useList().editListTitle;
	const newListTitle = useList().newListTitle;
	const updateNewListTitle = useList().updateNewListTitle;
	const {listTitle} = props

	return (
		<>
			<Button onClick={onOpen}>
				<EditIcon />
			</Button>

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
								placeholder={listTitle}
								value={newListTitle}
								onChange={updateNewListTitle}
								errorBorderColor="red.300"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Popover>
							<PopoverTrigger>
								<Button
									onClick={() => {
										editListTitle(newListTitle);
									}}
									mr={3}
								>
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
