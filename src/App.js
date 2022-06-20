import React from "react";
import "./App.css";

import { CameraFeed, Header, Inferring, Start, Steps } from "./components";

import { Switch, Route } from "react-router-dom";
import { Box, Paper, Grid } from "@mui/material";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Start} />
        <Route
          exact
          path="/game"
          render={(props) => (
            <div className="game">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Inferring />
                </Grid>
                <Grid item xs={4}>
                  <Steps />
                </Grid>
              </Grid>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
