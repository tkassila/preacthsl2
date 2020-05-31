import React, { Component } from 'preact';
import {h, p } from 'preact';
import LegStep from './LegStep';
import NearStop from '../neareststops/searchstops/NearStop';
import NearestStops from '../neareststops/NearestStops';
import StaticFunctions from '../util/StaticFunctions';
import Config from '../util/Config';

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
       let openpdflink = null;
       if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_HSL)
         openpdflink = <a target="_blank" id={"open" +props.legdata.gtfsId} 
         href={NearestStops.getPDFURL()+ NearestStops.localHSLUri +"/stops/" +
         NearStop.getStopIdAfterStartID(props.legdata.gtfsId) +".pdf"}>
             (Avaa aikataulu pdf)</a>;

        let opentimetablelink = null;
        if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_HSL)
            opentimetablelink = <a target="_blank" id={"open" +props.legdata.gtfsId}
            href={"https://reittiopas.hsl.fi/pysakit/" +props.legdata.gtfsId +"/aikataulu"}>
           (Avaa kartta-aikataulu sivu)</a>;
        else
        if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_FINLAND)
            opentimetablelink = <a target="_blank" id={"open" +props.legdata.gtfsId}
            href={"https://opas.matka.fi/pysakit/" +props.legdata.gtfsId +"/aikataulu"}>
            (Avaa kartta-aikataulu sivu)</a>;

       let legname = props.legdata.mode;
       let starttime = null;
       if (legname == "WALK")
           starttime = StaticFunctions.getToStringFromEndTime(props.legda.departureTime, 0);
       else
           starttime = StaticFunctions.getToStringFromEndTime(props.legdata.departureTime, 0);
       
           //<div id={"istopslinkdiv"+props.legdata.id} data-message="välipysäkki">
        let showtext = this.props.legdata.name +" Lähtöaika "+ starttime +" " +
                        props.legdata.desc;
       return (<div><li id="" tabIndex="0" auto-label={showtext}>
       <b>{showtext}</b></li>&nbsp;&nbsp; {openpdflink} &nbsp;&nbsp;
        {opentimetablelink}</div>
       );
}

export default IntermediateStop;