import React, { useContext, useState, useEffect } from "react";

const ListContext = React.createContext();

export function useList() {
    return useContext(ListContext)
}

export function ListProvider({ children }) {
    const [lists, setLists] = useState([])
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/lists/")
            const responseData = await response.json();
            setLists(responseData.lists)
        }
        fetchData()
    }, [lists])

    return <ListContext.Provider value={lists}>{children}</ListContext.Provider>
}