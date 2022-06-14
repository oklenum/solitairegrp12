import React from "react";
import "./App.css";

import { CameraFeed, Header, Inferring } from "./components";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <div className="bg">
        <Header />
      </div>

      <Inferring />
    </div>
  );
};

export default App;
