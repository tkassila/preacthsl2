import React, { Component } from 'preact';
import { useContext } from 'preact/compat';
import {h, p } from 'preact';
import LegStep from './LegStep';
import NearStop from '../neareststops/searchstops/NearStop';
import NearestStops from '../neareststops/NearestStops';
import StaticFunctions from '../util/StaticFunctions';
import Config from '../util/Config';
import CssDark from  '../context/Context';

/**
 * This class is used when showing an intermediate stop under a route plan and 
 * under a stop.
 * 
 * @param {*} props 
 */
function IntermediateStop(props) {
        /*
        if (this.props && this.props.legClicked != null)
            return (<div id="istopslinkdiv"><a id={"istopslink" +this.props.id} href={this.props.id} 
    onClick={this.props.legClicked}>{this.props.legdata.name} {this.props.legdata.vehicleType} Etäisyys {LegStep.getRoundedMeterDistance(this.props.legdata.distance)}</a></div>);
        else
        */
       /*
        return (<div id="istopslinkdiv"><a id={"istopslink" +props.id} href={props.id} 
        onClick={props.legClicked}>{props.legdata.name} {props.legdata.vehicleType} Etäisyys {LegStep.getRoundedMeterDistance(props.legdata.distance)}</a></div>);
*/

/*
        return (<div id="istopslinkdiv">
        <a id={this.props.legdata.gtfsId} href={this.props.legdata.gtfsId} style={
            this.props.canClick ? {pointerEvents: "none"} : null}
        onClick={this.astopClicked}>{this.props.legdata.locationType == "STOP" ? "" : "Asema"} {this.props.legdata.code}
        {this.props.legdata.name} {this.props.legdata.desc} Etäisyys {LegStep.getRoundedMeterDistance(this.props.legdata.distance)}</a>
    &nbsp;&nbsp;(<a target="_blank" id={"open" +this.props.legdata.gtfsId}
         href={"https://reittiopas.hsl.fi/pysakit/" +this.props.legdata.gtfsId +"/aikataulu"}>
        Avaa aikataulu sivu</a>)
        <ul id={"ul" +this.props.legdata.gtfsId} >                    
        {sorted.map(stime => <StopTime htmlelement="p" data={stime}/>)} 
        </ul>
        </div>);      
        */
       const cssDark = useContext(CssDark);

       let openpdflink = null;
       if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_HSL)
         openpdflink = <a className={"a" +cssDark} target="_blank" id={"open" +props.legdata.gtfsId} 
         href={NearestStops.getPDFURL()+ NearestStops.localHSLUri +"/stops/" +
         NearStop.getStopIdAfterStartID(props.legdata.gtfsId) +".pdf"}>
             (Avaa aikataulu pdf)</a>;
//        else
  //          openpdflink = '';

        let opentimetablelink = null;
        if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_HSL)
            opentimetablelink = <a className={"a" +cssDark} target="_blank" id={"open" +props.legdata.gtfsId}
            href={Config.HSL_SERVER_URL +"/pysakit/" +props.legdata.gtfsId +"/aikataulu"}>
           (Avaa kartta-aikataulu sivu)</a>;
        else
        if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_FINLAND)
            opentimetablelink = <a className={"a" +cssDark} target="_blank" id={"open" +props.legdata.gtfsId}
            href={Config.FINLAN_SERVER_URL +"/pysakit/" +props.legdata.gtfsId +"/aikataulu"}>
            (Avaa kartta-aikataulu sivu)</a>;
    //    else
     //       opentimetablelink = '';

       let legname = props.legdata.mode;
       let starttime = null;
       if (legname == "WALK")
           starttime = StaticFunctions.getToStringFromEndTime(props.legda.departureTime, 0);
       else
           starttime = StaticFunctions.getToStringFromEndTime(props.legdata.departureTime, 0);
       
           //<div id={"istopslinkdiv"+props.legdata.id} data-message="välipysäkki">
        let showtext = "Pysäkki " +this.props.legdata.name +" "+
            StaticFunctions.getLegVehicleType(this.props.legdata) +" "
                        +" Lähtöaika "+ starttime +" " +
                        ( props.legdata.desc != null ? props.legdata.desc : '');
       return (<div><li className={"li" +cssDark} id="" tabIndex="0" auto-label={showtext}>
       <b>{showtext}</b></li>{openpdflink}{(openpdflink != null ? ' ' : null)} 
        {opentimetablelink}</div>
       );
}

export default IntermediateStop;