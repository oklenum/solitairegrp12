import React from "react";
import "./App.css";

import { Header, Detection, Start } from "./components";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Start} />
        <Route exact path="/game" component={Detection} />
      </Switch>
    </div>
  );
};

export default App;
