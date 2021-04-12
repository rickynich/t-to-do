import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import Lists from "./components/List/Lists";

import { ListProvider } from "./components/Context/ListContext";

import { Flex, Text } from "@chakra-ui/layout";

function App() {
	// useEffect(() => {
	//   (async() => {
	//     const user = await authenticate();
	//     if (!user.errors) {
	//       setAuthenticated(true);
	//     }
	//     setLoaded(true);
	//   })();
	// }, []);

	return (
		<ListProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/users" exact={true}>
						<UsersList />
					</Route>
					<Route path="/users/:userId" exact={true}>
						<User />
					</Route>
					<Route path="/" exact={true}>
						<Flex direction="column" justifyContent="center" alignContent="center" p={6}>
							<Text align="center" fontSize="3xl" m={6} fontWeight="bold">Welcome to your To-Do List</Text>
							<Lists />
						</Flex>
					</Route>
				</Switch>
			</BrowserRouter>
		</ListProvider>
	);
}

export default App;
