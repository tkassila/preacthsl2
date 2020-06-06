import React, { Component, createRef } from 'preact';
import {h, p } from 'preact';
import Router from 'preact-router';
import RoutePlans from './routeplan/RoutePlans';
//import RoutePlans from 'routeplans';
import Header from './components/header/Header';
//import Header from 'header';
//import { Views, Link } from 'preact-views';
import { Link } from 'preact-views';

// import logo from './logo.svg';
// import './App.css';
import NearestStops from './neareststops/NearestStops.js';
import Config from './util/Config';
import AppPages from './AppPages';
//import gql from "apollo-boost";

const cssFuncLoader = () => import('./App.css');
const cssFuncLoaderDark = () => import('./AppDark.css');

// require the decache module:

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
  
  static defaultStyle = true;

  // const importCss = () => { return import('./App.css'); } 
  constructor(props)
  {
    super(props);
    this.state = {
      showSidebar: false,
      loaddarkstyle: true
    }
  }

  changeStyle = () =>
	{
		const { loaddarkstyle } = this.state;
		this.setState({ loaddarkstyle: !loaddarkstyle});
	}

  shouldComponentUpdate(nextProps, nextState)
	{
		return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
  }

  changeStyleSheet()
  {
    console.log("changeStyleSheet()");
    if (this.state.loaddarkstyle != null)
    {
      if (this.state.loaddarkstyle)
      {
        console.log("./AppDark.css");
        // import('./AppDark.css');
        this.setState({ stylePath: './AppDark.css' });
        //document.body.classList.remove(cssFuncLoader());
        // document.body.classList.add('mdc-theme--dark');
      }
      else
      {
        console.log("./App.css'");
        // import('./App.css');
        this.setState({ stylePath: './App.css' });
      }
      // forceUpdate();
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
    // const showSidebar = this.state.showSidebar;
    // const  size = 'small';
    // <link rel="stylesheet" type="text/css" href={this.state.loaddarkstyle ? './AppDark.css' : './App.css'} />

    if (Config.bDebug)
    {
      console.log("document.documentURI");
      console.log(document.documentURI);
      console.log("baseUrl");
    }
    let baseUrl = window.location.protocol + "//" + window.location.hostname +":" + window.location.port;
    if (Config.bDebug)
      console.log(baseUrl);
    let ind = document.baseURI.toString().indexOf(baseUrl);
    if (Config.bDebug)
    {
      console.log("ind");
      console.log(ind);
    }
    let removedDocumentURI = document.baseURI.toString().substring(ind+baseUrl.length);
    if (Config.bDebug)
    {
      console.log("removedDocumentURI");
      console.log(removedDocumentURI);
    }
    let cssPath = "";
    if (removedDocumentURI != null 
        && (removedDocumentURI.includes("routeplan")
        || removedDocumentURI.includes("reitti")
        ))
      cssPath = "../";

    return (      
      <div>
        <link rel="stylesheet" type="text/css" href={this.state.loaddarkstyle ? cssPath +'AppDark.css' : cssPath +'App.css'} />
        <AppPages selectedDataSource={this.selectedDataSource}
          loaddarkstyle={this.state.loaddarkstyle}
          changeStyle={this.changeStyle}
        /> 
      </div>  
    );
  } 
}

/*
        <Header changeStyle={this.changeStyle} 
        loaddarkstyle={this.state.loaddarkstyle} />
       <Router>
        <div path='/' default>
           <NearestStops title="Pysäkkikysely" 
           selectedDataSource={this.selectedDataSource}/>
        </div>
        <div path='/reitti'>
          <RoutePlans title="Pysäkkireittiehdotukset" 
          selectedDataSource={this.selectedDataSource}/>
        </div>        
        <div path='/routeplan'>
          <RoutePlans title="Pysäkkireittiehdotukset"
           selectedDataSource={this.selectedDataSource}/>
        </div>        
        </Router>
*/

/*
   <Router>
           <NearestStops path='/' default />
           <RoutePlan path='/routeplan' />           
        </Router>     
        
  */

export default App;
