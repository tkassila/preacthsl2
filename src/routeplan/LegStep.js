import {h, p, Component, render } from 'preact';
import { useContext } from 'preact/compat';

import IntermediateStop from './IntermediateStop';
import StaticFunctions from '../util/StaticFunctions';
import NearestStops from '../neareststops/NearestStops';
import Config from '../util/Config';
import { useState } from 'preact/hooks';
import CssDark from  '../context/Context';

/**
 * This is used inside of LegStep component.
 * 
 * @param {*} props 
 */
function useIntermediateStops(props) 
{
    const [intermediates, setIntermediates] = useState(null);

        if (Config.bDebug)
        {
            console.log("LegStep constructor");
            console.log("legdata");
            console.log(props.legdata);
            console.log("legdata.intermediateStops");
            console.log(props.legdata.intermediateStops);
        }

        let tmpintermediates = null;
        if (props.legdata.intermediateStops != null && props.legdata.intermediateStops.length > 0)
        { 
            if (Config.bDebug)
            {           
            console.log("props.legdata.intermediatePlaces: ");
            console.log(props.legdata.intermediatePlaces);
            console.log("props.legdata.intermediateStops: ");
            console.log(props.legdata.intermediateStops);
            }
            tmpintermediates = StaticFunctions.assignArrItems(props.legdata.intermediateStops, props.legdata.intermediatePlaces);
            if (Config.bDebug)
            {
            console.log("intermediates: ");
            console.log(tmpintermediates);
            }            
        }
        setIntermediates(tmpintermediates);
        
    return { intermediates };
  }

/**
 * This fuoncitonal component is used there are lowest data entity under a route
 * plan.
 * 
 * @param {*} props 
 */
function LegStep (props) {
  
   /* constructor(props) {
        super(props);
        console.log("LegStep constructor");
        console.log("legdata");
        console.log(this.props.legdata);
        console.log("legdata.intermediateStops");
        console.log(this.props.legdata.intermediateStops);

        let intermediates = null;
        if (props.legdata.intermediateStops != null && props.legdata.intermediateStops.length > 0)
        {            
            console.log("props.legdata.intermediatePlaces: ");
            console.log(props.legdata.intermediatePlaces);
            console.log("props.legdata.intermediateStops: ");
            console.log(props.legdata.intermediateStops);
            intermediates = StaticFunctions.assignArrItems(props.legdata.intermediateStops, props.legdata.intermediatePlaces);
            console.log("intermediates: ");
            console.log(intermediates);
        }
        this.state = { 
            intermediates: intermediates,
            legClicked: props.legClicked       
        }
        */

       const cssDark = useContext(CssDark);
       const { intermediates } = useIntermediateStops(props);
       let legname = props.legdata.mode;
       if (Config.bDebug)
       {
            console.log("legname: ");
            console.log(legname);
       }
       let starttime = null;
       let duration = StaticFunctions.getSecondsIntoMinutes(props.legdata.duration);
       if (legname == "WALK")
           starttime = StaticFunctions.getToStringFromEndTime(props.legdata.startTime, props.legdata.arrivalDelay);
       else
           starttime = StaticFunctions.getToStringFromEndTime(props.legdata.startTime, props.legdata.arrivalDelay);
                 
        if (starttime == null)
            starttime = "";

        if (Config.bDebug)
        {
            console.log("LegStep:render");
            console.log("LegStep:intermediates");
            console.log(intermediates);
        }      
        if (intermediates != null && 
            intermediates.length > 0) 
        {            

            const intermediateStops = intermediates.map((istop, ind) => { 
                return <IntermediateStop id={"intermediateStop" +ind} index={ind} 
                legdata={istop} cssDark={cssDark}
                 />});
            
            if (Config.bDebug)
                console.log("-LegStep:intermediateStops" +intermediateStops);

            if (Config.bDebug && intermediateStops != null)
                console.log("-LegStep:intermediateStops nro" +intermediateStops.length);

                if (intermediateStops !== null)        
                {
                    let showedtext = starttime +
                    " Määränpäähän " +StaticFunctions.getRoundedMeterDistance(props.legdata.distance) +
                    " Kesto " +duration +" min";                    
                    return (<div><li className={"li" +cssDark} tabIndex="0" aria-label={showedtext}>{showedtext}</li>
                        <ul >{intermediateStops}</ul>                        
                        </div>);
                }
                else
                {
                    let showedtext = starttime +" "
                    +StaticFunctions.getLegName(props.legdata) +
                    " Määränpäähän " + StaticFunctions.getRoundedMeterDistance(props.legdata.distance) +
                    " Kesto " +duration +" min";
                    return (<li className={"li" +cssDark} tabIndex="0" aria-label={showedtext}>
                        {showedtext}
                        </li>);
                }
        }
        else
        {
            let showedtext = starttime +" "
            +StaticFunctions.getLegName(props.legdata) + 
            " Määränpäähän " + StaticFunctions.getRoundedMeterDistance(props.legdata.distance) +
            " Kesto " +duration +" min";
            return (<li className={"li" +cssDark} tabIndex="0" aria-label={showedtext}>{showedtext}</li>);
        }
}

export default LegStep;