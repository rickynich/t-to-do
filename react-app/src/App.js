import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersList from "./components/User/UsersList";
import User from "./components/User/User";
import Lists from "./components/List/Lists";

import { ListProvider } from "./components/Context/ListContext";

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
            <h1>Welcome to your To-Do List</h1>
            <Lists></Lists>
					</Route>
				</Switch>
			</BrowserRouter>
		</ListProvider>
	);
}

export default App;
