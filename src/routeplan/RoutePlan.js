import {h, p, render, Component } from 'preact';
import { useContext } from 'preact/compat';
import LegStep from './LegStep';
import Config from '../util/Config';
//import NearestStops from '../neareststops/NearestStops';
import StaticFunctions from '../util/StaticFunctions';
import CssDark from  '../context/Context';
import { useState, useEffect  } from 'preact/hooks';

// class RoutePlan extends Component {
const RoutePlan = (props) => {
    const [routeplanclicked, setRouteplanclicked] = useState(props.showShowAllLegs == null ? false : props.showShowAllLegs);
    const [showShowAllLegs, setShowShowAllLegs] = useState(props.showShowAllLegs == null ? false : props.showShowAllLegs);
    /*
    constructor(props) {
        super(props);
        if (Config.bDebug)
        {
        console.log("Routeplan constructor");
        console.log("plan");
        console.log(this.props.plan);
        console.log("legs");
        console.log(this.props.plan.legs);
        console.log("props.showShowAllLegs");
        console.log(props.showShowAllLegs);
        }

        this.state = {        
            routeplanclicked: props.showShowAllLegs
        }
    }
     
    shouldComponentUpdate(nextProps, nextState) { 
        if (nextState.routeplanclicked != this.state.routeplanclicked)
        {
            return true;
        }
        else
        if (nextProps.showShowAllLegs)
        {
            this.setState({ routeplanclicked: true });
            return true;
        }
        else
        if (!nextProps.showShowAllLegs)
        {
            this.setState({ routeplanclicked: false });
            return true;            
        }
        return false;
    }
    */

   useEffect(() => {    
    if (Config.bDebug)
    {
    console.log("useEffect()");
    console.log("id: " +props.id +" showShowAllLegs " +showShowAllLegs);
    }
    let newvalue = props.showShowAllLegs == null ? false : props.showShowAllLegs;
        if (newvalue != showShowAllLegs)
        {
            setRouteplanclicked(newvalue);
            setShowShowAllLegs(newvalue);
        }
    });
     
    const planClicked = (event) => {  
        event.preventDefault();
        let newbvalue = !routeplanclicked;
        if (Config.bDebug)
        {
        console.log("planClicked()");
        console.log("id: " +props.id +" " +newbvalue);
        }
        setRouteplanclicked(newbvalue);
        if (Config.bDebug)
            console.log("planClicked() 2");
    }

    const getHeaderLink = (leg) =>
    {
        if (leg == null)
            return null;
        return <a onClick={planClicked}>{leg.mode}</a>;
    }

    // render(props, state) {
        const cssDark = useContext(CssDark);

        let legs = props.plan.legs; 
        let leg = legs[0];
        let legname = leg.mode;
        let starttime = null;
        if (legname == "WALK")
            starttime = StaticFunctions.getToStringFromEndTime(leg.startTime, leg.arrivalDelay);
        else
            starttime = StaticFunctions.getToStringFromEndTime(leg.endTime, leg.arrivalDelay);
            
        if (Config.bDebug)
        {       
        console.log("legname");
        console.log(legname);
        }
        if (leg != null && leg.route != null) 
        {
            if (Config.bDebug)
            {
            console.log("leg.route.shortname");
            console.log(leg.route.shortName);
            console.log("leg.route.longname");
            console.log(leg.route.longName);
            }
            legname = StaticFunctions.getLegName(leg);
        }
        else
        if (leg != null && leg.route == null && props.plan.legs.length > 1) 
        {
            if (Config.bDebug)
                console.log("leg != null && leg.intermediateStops == null && props.plan.legs.length > 1");
            let secondleg = props.plan.legs[1];
            if (Config.bDebug)
            {
                console.log("secondleg");
                console.log(secondleg);
                
                console.log("secondleg.route.shortname");
                console.log(secondleg.route.shortName);
                console.log("secondleg.route.longname");
                console.log(secondleg.route.longName);
            }
            if (secondleg != null && secondleg.route != null) 
                legname = StaticFunctions.getLegName(secondleg);
        }
        if (Config.bDebug)
        {
            console.log("leg");
            console.log(leg);
            console.log("routeplanclicked");
            console.log(routeplanclicked);
            console.log("legname");
            console.log(legname);
        }

         if (leg == null)
            return null;
        if (Config.bDebug)
             console.log("not null"); // href={"routeplan" +this.props.id}
        let planlink = <a className={"a" +cssDark} id={"planlink" +props.id} href=""
            onClick={planClicked}>{legname} Lähtöaika {starttime} Etäisyys {StaticFunctions.getRoundedMeterDistance(leg.distance)}</a>;
        if (Config.bDebug)
        {
            console.log("planlink");
            console.log(planlink);
        }
        if (!routeplanclicked)
            return <li ><div className={"div" +cssDark} >{planlink}</div></li>;
        else
        {
            if (Config.bDebug)            
                console.log("else 1");
            let legs = props.plan.legs.map((legdata, ind) => { 
                return <LegStep id={"legstep" +ind} 
                        legClicked={false} 
                        legdata={legdata} />});
            if (Config.bDebug)
            {
                console.log("else legs");
                console.log(legs);
            }
            return (
                <li ><div>{planlink}
               <ul id={"legsul"+props.index}>{legs}</ul>               
               </div>
               </li>
            );
        }
   // }
}

export default RoutePlan;