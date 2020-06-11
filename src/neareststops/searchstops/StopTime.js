import React, { p, Component } from 'preact';
import Config from '../../util/Config';
import StaticFunctions from '../../util/StaticFunctions';

/**
 * This class is used to show a bus stop or like that.
 * 
 * @param {*} props 
 */
function StopTime(props) {
{ 
        let ret = null; // role="option"
        if (Config.bDebug)
        {
            console.log("StopTime");
            console.log("data");
            console.log(props.data);
        }        
        if (props.htmlelement == "p")
        {
            ret = ( <p tabIndex="0">
                {props.data.strarrivetime} <b>{props.data.trip.routeShortName}</b> 
                <space> </space>
                {StaticFunctions.getTransportMode(StaticFunctions.getRouteType(props.data.vehicleType))}
                <space> </space>
                {props.data.stopHeadsign.toString().replace(" via ", " kautta ")}
                </p>
                );
            return ret;
        }
        else
        return ( <li tabIndex="0" aria-label={"pysäkkiaika " 
            + props.data.strarrivetime +" "+ props.data.trip.routeShortName +" "
            +StaticFunctions.getTransportMode(StaticFunctions.getRouteType(props.data.vehicleType))
            +" " + props.data.stopHeadsign}>
            {props.data.strarrivetime} <b> {props.data.trip.routeShortName}</b>
            <space> </space>
            {StaticFunctions.getTransportMode(StaticFunctions.getRouteType(props.data.vehicleType))}
            <space> </space>
             {props.data.stopHeadsign.toString().replace(" via ", " kautta ")}
            </li>
        );
    }
}


export default  StopTime;