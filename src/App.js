import React, { Component } from 'preact';
import {h, p } from 'preact';
import Router from 'preact-router';
import RoutePlans from './routeplan/RoutePlans';
//import RoutePlans from 'routeplans';
import Header from './components/header/Header';
//import Header from 'header';
//import { Views, Link } from 'preact-views';
import { Link } from 'preact-views';

// import logo from './logo.svg';
import './App.css';
import NearestStops from './neareststops/NearestStops.js';
import Config from './util/Config';
//import gql from "apollo-boost";

/*
const GET_LINKS = gql`
query {
    alllinks {
        url
        type
        meta {
            author 
            date 
            description 
            image 
            logo 
            publisher 
            title
            url
        }
    }
}`;
*/


/*
const Home = () => (
  <div>
    <h1>Home!</h1>
    <Link to="other" params={{ value:1 }}>Go Other</Link>
  </div>
);


const Other = ({ value=0 }) => (
  <div>
    <h1>Other.</h1>
    <Link to="home">Go Home</Link>
    <p>value is {value}.</p>
    <Link to="other" params={{ value: value+1 }}>Increment</Link>
  </div>
);
*/

class App extends Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
      showSidebar: false
    }
  }

  selectedDataSource = (event) => {
    let selectedvalue = event.target.value;
    if (selectedvalue == null || selectedvalue == undefined)
      return;
    if (Config.bDebug)
    {
      console.log("selectedDataSource");
      console.log("selectedvalue");
      console.log(selectedvalue);
    }
    if (selectedvalue == null || (selectedvalue != "HSL"
        && selectedvalue != "FINLAND" && selectedvalue != "WALTTI" ))
        return;

    switch(selectedvalue) {
       case "HSL":
          NearestStops.localHSLUri = Config.HSLLSERVICEURI_HSL;          
          if (Config.bDebug)
            console.log("--HSL");
          break;
       case "WALTTI":
          NearestStops.localHSLUri = Config.HSLLSERVICEURI_WALTTI;
          if (Config.bDebug)
            console.log("--WALTTI");
          break;
       case "FINLAND":
          NearestStops.localHSLUri = Config.HSLLSERVICEURI_FINLAND;
          if (Config.bDebug)
            console.log("--FINLAND");
          break;
    }
    if (Config.bDebug)
    console.log("NearestStops.localHSLUri");
    if (Config.bDebug)
    console.log(NearestStops.localHSLUri);
  }

  render() {
    const showSidebar = this.state.showSidebar;
    const  size = 'small';
    return (
      <div>
        <Header selectedDataSource={this.selectedDataSource}/>
       <Router>
        <div path='/' default>
           <NearestStops title="Pysäkkikysely" selectedDataSource={this.selectedDataSource}/>
        </div>
        <div path='/routeplan'>
        <RoutePlans title="Pysäkkireittiehdotukset" selectedDataSource={this.selectedDataSource}/>
        </div>        
        </Router>
      </div>  
    );
  } 
}

/*
   <Router>
           <NearestStops path='/' default />
           <RoutePlan path='/routeplan' />           
        </Router>     
        
  */

export default App;
