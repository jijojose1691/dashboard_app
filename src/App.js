import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import RackTable from './components/RackTable'




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
