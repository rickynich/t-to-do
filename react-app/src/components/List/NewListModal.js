import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React from "react"
function NewListModal(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
    const { createNewListHandler } = props
    console.log("props", props)
	return (
		<>
			<Button onClick={onOpen}>Create New List</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your new list</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>List title</FormLabel>
							<Input placeholder="List title" />
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={createNewListHandler} mr={3}>
							Create
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default NewListModal;
