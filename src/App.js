import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'
import NavBar from './components/NavBar'
import RackTable from './components/RackTable'
import combReducer from './reducers/reducer.js'

var store = createStore(combReducer)

class App extends Component {
  render() {
     return (
       <div>
         <NavBar />
         <RackTable />
       </div>
     )
   }
}

export default App;
