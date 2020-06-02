import {h, p, render, Component } from 'preact';
import LegStep from './LegStep';
import Config from '../util/Config';
//import NearestStops from '../neareststops/NearestStops';
import StaticFunctions from '../util/StaticFunctions';

class RoutePlan extends Component {

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
        /*      
        if(this.state.addressfeatures !== nextState.addressfeatures
           || this.state.neareststops !== nextState.neareststops
           */
    }

    planClicked = (event) => {  
        event.preventDefault();
        let newbvalue = !this.state.routeplanclicked;
        if (Config.bDebug)
        {
        console.log("planClicked()");
        console.log("id: " +this.props.id +" " +newbvalue);
        }
        this.setState({routeplanclicked: newbvalue});
        if (Config.bDebug)
            console.log("planClicked() 2");
    }

    getHeaderLink(leg)
    {
        if (leg == null)
            return null;
        return <a onClick={this.planClicked}>{leg.mode}</a>;
    }

    render(props, state) {
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
            console.log(state.routeplanclicked);
            console.log("legname");
            console.log(legname);
        }

         if (leg == null)
            return null;
        if (Config.bDebug)
            console.log("not null"); // href={"routeplan" +this.props.id}
        let planlink = <a id={"planlink" +this.props.id} href=""
            onClick={this.planClicked}>{legname} Lähtöaika {starttime} Etäisyys {StaticFunctions.getRoundedMeterDistance(leg.distance)}</a>;
        if (Config.bDebug)
        {
            console.log("planlink");
            console.log(planlink);
        }
        if (!state.routeplanclicked)
            return <li ><div>{planlink}</div></li>;
        else
        {
            if (Config.bDebug)            
                console.log("else 1");
            let legs = this.props.plan.legs.map((legdata, ind) => { 
                return <LegStep id={"legstep" +ind} 
                        legClicked={false} 
                        legdata={legdata}/>});
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
    }
}

export default RoutePlan;