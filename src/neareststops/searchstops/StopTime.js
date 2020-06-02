import React, { p, Component } from 'preact';

/**
 * This class is used to show a bus stop or like that.
 * 
 * @param {*} props 
 */
function StopTime(props) {
{ 
        let ret = null; // role="option"
        if (props.htmlelement == "p")
        {
            ret = ( <p>
                {props.data.strarrivetime} <b>{props.data.trip.routeShortName}</b> {props.data.stopHeadsign}
                </p>
                );
            return ret;
        }
        else
        return ( <li tabIndex="0" aria-label={"pysäkkiaika " 
            + props.data.strarrivetime +" "+ props.data.trip.routeShortName +" "
            + props.data.stopHeadsign}>
            {props.data.strarrivetime} <b>
            {props.data.trip.routeShortName}</b> {props.data.stopHeadsign}
            </li>
        );
    }
}


export default  StopTime;