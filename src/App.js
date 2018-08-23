import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import RackTable from './components/RackTable'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'



class App extends Component {
  render() {
     return (

       <Router>
  <div>
    <nav>
               <NavBar />
    </nav>
    <main>
      <Route exact path="/rackstatus" component={RackTable}/>
      <Route exact path="/" render={() => <Redirect to="/rackstatus"/>}/>
    </main>
  </div>
</Router>
     )
   }
}

export default App;
