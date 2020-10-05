import React, { Component, Fragment } from 'preact';
import {h, p } from 'preact';
import Router from 'preact-router';
import RoutePlans from './routeplan/RoutePlans';
import Header from './components/header/Header';
import './App.css';
import CssDark from './context/Context';

import NearestStops from './neareststops/NearestStops.js';
import Config from './util/Config';
import AppPages from './AppPages';

class App extends Component {
  
  static defaultStyle = true;

  // const importCss = () => { return import('./App.css'); } 
  constructor(props)
  {
    super(props);
    this.state = {
      showSidebar: false,
      loaddarkstyle: true,
      cssPath: "/",
      stylePath: 'AppDark.css',
      stylechangedattime: null,
      cssDark: "_dark"
    }
  }

  shouldComponentUpdate(nextProps, nextState)
	{
		return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
  }

  changeStyleSheet = () =>
  {
    console.log("changeStyleSheet()");
    let loaddarkstyle = this.state.loaddarkstyle;
    if (loaddarkstyle != null)
    {
      loaddarkstyle = !loaddarkstyle;
      if (loaddarkstyle)
      {
        console.log("./AppDark.css");
        // import('./AppDark.css');    
        this.setState({ cssDark: "_dark", stylePath: 'AppDark.css' });
        //document.body.classList.remove(cssFuncLoader());
        // document.body.classList.add('mdc-theme--dark');
      }
      else
      {
        console.log("./App.css'");
        // import('./App.css');
        this.setState({ cssDark: "", stylePath: 'App.css' });
      }
      this.setState({ loaddarkstyle: loaddarkstyle, stylechangedattime: new Date()});    
      this.forceUpdate();
    }
  }

  linkClicked =  (event) => {
    console.log("linkClicked");
    console.log("event");
    console.log(event);
    let href = event.target.attributes.href;
    if (href == null || href == undefined)
      return;
    console.log("href");
    console.log(href);
    if (href.toString() == "/")
      this.setState({ cssPath: "" });
    else
      this.setState({ cssPath: "../" });
    console.log("cssPath");
    console.log(this.state.cssPath);
    console.log("state.cssPath +state.stylePath");
    console.log(this.state.cssPath +this.state.stylePath);
    this.forceUpdate();
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

  render(props, state) {
    return (      
      <Fragment>
        <link rel="stylesheet" type="text/css" href="/App.css" />
        <CssDark.Provider value={this.state.cssDark}>
        <AppPages selectedDataSource={this.selectedDataSource} linkClicked={this.linkClicked}
          loaddarkstyle={this.state.loaddarkstyle} stylechangedattime={this.state.stylechangedattime}
          changeStyle={this.changeStyleSheet} cssPath={state.cssPath}
          cssDark={state.cssDark}
        /> 
        </CssDark.Provider>
      </Fragment>
    );
  } 
}

export default App;
