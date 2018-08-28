import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import RackTable from "./components/RackTable";
import RackExecuionTable from "./components/RackExecutionTable";
import ExecutionOverview from "./components/ExecutionOverview";
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
            <Route path="/rackExecutionStatus" component={RackExecuionTable} />
            <Route path="/executionOverview" component={ExecutionOverview} />
            <Route path="/rackStatus" component={RackTable} />
            <Route
              path="/"
              render={() => <Redirect to="/executionOverview" />}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
