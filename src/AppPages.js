import React, { Component, createRef } from 'preact';
import {h, p } from 'preact';
import Router from 'preact-router';
import RoutePlans from './routeplan/RoutePlans';
//import RoutePlans from 'routeplans';
import Header from './components/header/Header';
import Help from './help/Help';

//import Header from 'header';

// import logo from './logo.svg';
import './App.css';
import NearestStops from './neareststops/NearestStops.js';
import Config from './util/Config';
//import gql from "apollo-boost";



class AppPages extends Component {
  
  static defaultStyle = true;
  cssloader = createRef();

  constructor(props)
  {
    super(props);
    this.state = {
      showSidebar: false,
      loaddarkstyle: props.loaddarkstyle
    }
    // this.cssloader = createRef();
    // this.changeStyleSheet();
  }


  shouldComponentUpdate(nextProps, nextState)
	{
		return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
  }

  //         <cssLoader ref={this.cssloader} loadDark={this.state.loaddarkstyle} />

  render(props, state) {
    const showSidebar = this.state.showSidebar;
    const  size = 'small';
    return (
      <div>
        <Header changeStyle={props.changeStyle} 
        loaddarkstyle={props.loaddarkstyle} />
       <Router>
        <div path='/' default>
           <NearestStops title="Pysäkkikysely" 
           selectedDataSource={props.selectedDataSource}/>
        </div>
        <div path='/reitti'>
          <RoutePlans title="Pysäkkireittiehdotukset" 
          selectedDataSource={props.selectedDataSource}/>
        </div>
        <div path='/routeplan'>
          <RoutePlans title="Pysäkkireittiehdotukset"
           selectedDataSource={props.selectedDataSource}/>
        </div>        
        <div path='/help'>
          <Help title="Ohje"
           selectedDataSource={props.selectedDataSource}/>
        </div>  
        <div path='/apua'>
          <Help title="Ohje"
           loaddarkstyle={props.loaddarkstyle}/>
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

export default AppPages;
