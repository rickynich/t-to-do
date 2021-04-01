import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";

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
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Switch>
        <Route path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </Route>
        <Route path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </Route>
        <Route path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
