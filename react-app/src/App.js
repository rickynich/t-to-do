import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";

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
				<NavBar />
				<Switch>
					<Route path="/users" exact={true}>
						<UsersList />
					</Route>
					<Route path="/users/:userId" exact={true}>
						<User />
					</Route>
					<Route path="/" exact={true}>
						<h1>My Home Page</h1>
					</Route>
				</Switch>
			</BrowserRouter>
		</ListProvider>
	);
}

export default App;
