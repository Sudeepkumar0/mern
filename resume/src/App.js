import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Education from "./Education";
import Skills from "./Skill";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="resume">
          <Header />
          <Education />
          <Skills />
        </div>
      </div>
    );
  }
}

export default App;
