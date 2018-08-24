import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import RackTable from "./components/RackTable";
import RackExecuionTable from "./components/RackExecutionTable";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <NavBar />
          </nav>
          <main>
            <Route
              exact
              path="/rackExecutionStatus"
              component={RackExecuionTable}
            />
            <Route exact path="/rackStatus" component={RackTable} />
            <Route
              exact
              path="/"
              render={() => <Redirect to="/rackStatus" />}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
