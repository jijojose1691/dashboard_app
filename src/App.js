import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux'
import './App.css';
import {createStore} from 'redux'
import HelloWorld from './containers/HelloWorld.js'
import NavBar from './components/NavBar'
import RackTable from './components/RackTable'
import combReducer from './reducers/reducer.js'
import CoursesList from './components/CoursesList'

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
