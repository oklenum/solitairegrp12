import React from "react";
import "./App.css";

import { CameraFeed, Header, Inferring, Start } from "./components";

import { Switch, Route } from "react-router-dom";
import { Box, Paper, Grid } from "@mui/material";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/game" component={Inferring} />
      </Switch>
    </div>
  );
};

export default App;
