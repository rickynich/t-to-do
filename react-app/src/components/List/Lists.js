import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";

//Chakra

//context
import {useList} from "../Context/ListContext"

export default function ListsList() {
    const [list, setList] = useState();
    const loadedLists = useList() //uses ListContext

    if (!loadedLists) return null
    
    const listComponents = loadedLists.map((list) => {
        console.log(list)
        return (
            <Button
                id={list.id}
                onClick={()=> setList(list) }
            >
                {list.title}
            </Button>
            // <h1>Hello</h1>
        )
    })

    return (
        <Flex>{listComponents}</Flex>
    )
}