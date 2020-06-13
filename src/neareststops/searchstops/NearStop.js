import React, { Fragment, render, Component } from 'preact';
import {h } from 'preact';
// import axios from 'axios';
import NearestStops from '../NearestStops';
import StopTime from './StopTime';
import Config from '../../util/Config';
import StaticFunctions from '../../util/StaticFunctions';
// import { duplicateFieldDefinitionNameMessage } from 'graphql/validation/rules/UniqueFieldDefinitionNames';

class NearStop extends Component 
{
    hsl_baseurl = null;
    address_search_url = null;
    client = null;
    timer = null;
  
    constructor(props) {
        super(props);
        if (Config.bDebug)
        {
          console.log("NearStop constructor(props)");
          console.log(this.props);  
        }
        this.hsl_baseurl = NearestStops.getHslBaseUrl();
        this.address_search_url = this.hsl_baseurl +"geocoding/v1/search?text=";
        
        this.state = {
            linkclicked: false,
            stop: this.props.stop,
            seeKAllStopTimes: false,
            secondquerystoptime: false,
        }
     
        if (this.props.client)
        {
            this.client = this.props.client;
            if (Config.bDebug)
              console.log("NearStop this.props.client");
        }

        if (Config.bDebug)
        {
        if (this.client)
          console.log("client=" +this.client);
        else
          console.log("null: client" );
        }
      //  this.makeGetQuery();
    }

    clearTimeout(timer)
    {
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.seeKAllStopTimes !== nextProps.seeKAllStopTimes) {
            if (nextProps.seeKAllStopTimes)
            {                
                this.setState({seeKAllStopTimes: true});
                this.seeKAllStopTimes();
            }    
            else
            {
              /*  if (this.state.seeKAllStopTimes)
                {
                    */                
                   this.setState({linkclicked: !this.state.linkclicked, seeKAllStopTimes: false});
               // }
            }            
        }
        if (this.props.stop !== nextProps.stop) {
            if (nextProps.stop)
            {                
                this.setState({stop: nextProps.stop, seeKAllStopTimes: false});
            } 
        }        
     }

     getNearestStopStartTime(starttime)
     {
        if (Config.bDebug)
        {
          console.log("NearStop getNearestStopStartTime() timeDate");
          console.log(starttime);
        }
          /*
          if (starttime == null || starttime.trim().length == 0)
            return null;
          */           

          /*
        try {
          let format = StaticFunctions.getMomentFormatAndNumbersCheck(starttime);
          if (Config.bDebug)
              console.log("NearStop format" +format);

          let timeDate = StaticFunctions.getTodayDateFromTime(starttime, format);
          if (timeDate != null)
          {
             if (Config.bDebug)
                console.log("NearStop StaticFunctions.getUnixSecondsFromDate()");
                */

             let sedonds = StaticFunctions.getUnixSecondsFromDate(starttime);             
             if (Config.bDebug)
             {
                console.log("NearStop sedonds" +sedonds);
                console.log("NearStop sedonds as Date");
                console.log(new Date(sedonds));
             }
             return `startTime: ` +sedonds +`,`;
             /*
          } 
        }
        catch(err) {
          // document.getElementById("demo").innerHTML = err.message;
          console.log("NearStop::getNearestStopStartTime - error starttime=" +starttime);
          console.log("NearStop::getNearestStopStartTime - error starttime=" +err);
          console.log("NearStop::getNearestStopStartTime - not using this value!");
        }
        return null;
        */
     }
    
    makeApolloCallForNearestStopTimes(stopid)
    {
      if (Config.bDebug)
      {
        console.log("NearStop makeApolloCallForNearestStopTimes 1 1" );
        console.log(stopid);
      }

        this.setState({underServerCall: true});
        let coordinates = null;

        const options = {
        method: 'POST',
            data: `{
		{
  stop(id: "` +stopid +`") {
    name
    lat
    lon
    vehicleType
    wheelchairBoarding
    stoptimesWithoutPatterns(omitNonPickups: true, numberOfDepartures: 10) {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      timepoint
      realtime
      realtimeState
      pickupType
      dropoffType
      serviceDay
      stopHeadsign
      headsign
      trip {
        gtfsId
        routeShortName
      }
    }
  }
}`,
    // credentials: 'include',
    headers: { "Content-Type": "application/graphql"}
  };
  
  let data = `{ stop(id: "HSL:1040129") {
    name
    lat
    lon
    wheelchairBoarding
  }  
}`;
  // let body = JSON.stringify(data);
  let body1 = `nearest(lat: 60.19414, lon: 25.02965, maxResults: 3, 
    trrt
  dddd
  }`;
  let longitude = 0;
  let latitude = 0;

  if (Config.bDebug)
  {
    console.log("this.props.usergivenStartTime");
    console.log(this.props.usergivenStartTime);
  }

  let starttime = null;
  if (this.props.usergivenStartTime != null 
    && this.props.usergivenStartTime.toString().hasDataAfterTrim())
      starttime = this.getNearestStopStartTime(this.props.usergivenStartTime);

  if (starttime == null || starttime.trim().length == 0)
      starttime = ``;      

  let body = `{
  stop(id: "` +stopid.toUpperCase() +`") {
    name
    lat
    lon
    vehicleType
    wheelchairBoarding
       stoptimesWithoutPatterns(` +starttime +`omitNonPickups: true, numberOfDepartures: 10) {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      timepoint
      realtime
      realtimeState
      pickupType
      dropoffType
      serviceDay
      stopHeadsign
      headsign
      trip {
        gtfsId
        routeShortName
      }
    }
  }
  }`;
      
  
  if (Config.bDebug)
  {
    console.log("body");
    console.log(body);
  }
  
  // http://localhost:8080/hsl/geocoding/v1/search
  /*
  fetch( this.hsl_baseurl +'routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    */
 //   headers: {"Content-Type": "application/graphql",  'Accept': '*/*'},
  /*  body: body })
    .then(response => { return response.json();})
    .then(responseData => {console.log(responseData.data); return responseData.data;})
    .then(data => { 
      console.log("data");
      console.log(data); }
      )
    .catch((error) => {
        console.error("error");
        console.error(error);
    });
    */
   if (Config.bDebug)
   {
	console.log("body2");
  console.log(body);
   }
	
   StaticFunctions.postData( this.hsl_baseurl +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/graphql",  'Accept': '*/*'},
    body: body })
    .then(response => { return response.json();})
    .then(responseData => { if (Config.bDebug) console.log(responseData.data); return responseData.data;})
    .then(data => { 
      if (Config.bDebug)
      {
        console.log("data");
        console.log(data);
      }
        let stoptimes = data.stop.stoptimesWithoutPatterns;
        if (stoptimes != null && stoptimes.length != 0)
        {
          if (Config.bDebug)
             console.log("stoptimes will change!");
          stoptimes.forEach(stoptime => {
            stoptime.vehicleType = data.stop.vehicleType;
          });
        }
        else
        {
            if (!this.state.secondquerystoptime)
            {
              this.timer = setTimeout(() => {
                console.log('Timeout called!');
              // if (Config.bDebug)
                console.log("!this.state.secondquerystoptime");
                this.setState({ secondquerystoptime: true});
                this.makeApolloCallForNearestStopTimes(stopid);
                this.clearTimeout(this.timer);
              }, 4000);       
            }
        }

        if (this.state.secondquerystoptime)
        {
          this.setState({ secondquerystoptime: false});
        }

        if (Config.bDebug)
        {
          console.log("stoptimes");
          console.log(stoptimes);
        }
        let bClicked = true;
        if (stoptimes == null || stoptimes.length == 0)
            bClicked = false;
        this.setState({neareststops: stoptimes, linkclicked: bClicked,
                      underServerCall: false});
    })
    .catch((error) => {
        console.error("error");
        console.error(error);
    });
  
/*
        fetch('http://localhost:8080/hsl/graphql/hsl', {
            method: 'post',
            headers: {"Content-Type": "application/graphql"},
            body: `{ stop(id: "HSL:1040129") {
                name
                lat
                lon
                wheelchairBoarding
              }  
            }`}
            ).then((response) => response.json())
           .then((responseJson) => {
            console.error("responseJson");
             return responseJson;
           })
           .catch((error) => {
            console.error("responseJson error");
             console.error(error);
           } );     
          */

         if (Config.bDebug)
           console.log("makeApolloCallForNearestStops 3" );
    }

     makeApolloCallForNearestStops2(addressfeatures)
     {
        console.log("makeApolloCallForNearestStops 2 1" );
        if (!addressfeatures)
            return;

            if (Config.bDebug)
            console.log("makeApolloCallForNearestStops before http CALL");

        // this.client.setUrl("https://api.digitransit.fi/graphql/hsl");
        /*
        this.client
            .query({
            query: gql`
            {
                stopsByRadius(lat:60.201706,lon:24.918506,radius:500) {
                  edges {
                    node {
                      stop { 
                        gtfsId 
                        name
                      }
                      distance
                    }
                  }
                }
            }        `
        })
      .then(result => console.log(result));
      */

      /*
     axios.post('https://api.digitransit.fi/graphql/hsl', { query: `{ 
        stopsByRadius(lat:60.201706,lon:24.918506,radius:1500) {
          edges {
            node {
              stop { 
                gtfsId 
                name
              }
              distance
            }
          }
        }
      }`,
      headers: { 'Content-Type': 'application/graphql' } })
      .then(function (response) {
        console.log("response");
        console.log(response);
      })
      .catch(function (error) {
        console.log("error");  
        console.log(error);
      });
      */

     var xhr = new XMLHttpRequest()
     //xhr.open("POST", 'https://api.digitransit.fi/graphql/hsl'  )
     xhr.open("POST", Config.hsl_baseurl +NearestStops.localHSLUri+ '/graphql/hsl'  )
     xhr.setRequestHeader('Content-Type', 'application/graphql' );
     xhr.withCredentials = false;
     xhr.onload = function(e){
        console.log("onload=>");
       if (xhr.readyState === 4){
         if (xhr.status === 200){
            console.log("onload 1 =>");
           var data = JSON.parse(xhr.response);
           console.log("onload 2 =>");
           console.log("onload 3 data => " +data);
           /*
           this.setState({
             story: story,
             storyLength: story.length,
             currentChapter: story[0]
           })
           */
         } else {
           console.error(xhr.statusText)
         }
       }
     }; // .bind(this);
 
     xhr.onprogress = function () {
        console.log('LOADING', xhr.status);
    };
  
    xhr.onerror = function(e){
       console.error(xhr.statusText)
     };

     if (Config.bDebug)
     console.log("makeApolloCallForNearestStops before http CALL 2");

     xhr.send( `{ 
        stopsByRadius(lat:60.201706,lon:24.918506,radius:1500) {
          edges {
            node {
              stop { 
                gtfsId 
                name
              }
              distance
            }
          }
        }
      }`);
    
      if (Config.bDebug)
        console.log("makeApolloCallForNearestStops AFTER  http CALL");
    }

    /*
    componentDidMount() {
        this.makeGetQuery();
    }
    */

   seconds_to_days_hours_mins_secs_str(seconds)
   { // day, h, m and s
     var days     = Math.floor(seconds / (24*60*60));
         seconds -= days    * (24*60*60);
     var hours    = Math.floor(seconds / (60*60));
         seconds -= hours   * (60*60);
     var minutes  = Math.floor(seconds / (60));
         seconds -= minutes * (60);
     return ((0<days)?(days+":"):"")+(hours < 10 ? "0" +hours : hours)+":"+
         (minutes < 10 ? "0" +minutes : minutes) +":"+
         (seconds < 10 ? "0" +seconds : seconds);
   }

   seconds_to_days_hours_mins_str(seconds)
   { // day, h, m and s
     var days     = Math.floor(seconds / (24*60*60));
         seconds -= days    * (24*60*60);
     var hours    = Math.floor(seconds / (60*60));
         seconds -= hours   * (60*60);
     var minutes  = Math.floor(seconds / (60));
         seconds -= minutes * (60);
     return ((0<days)?(""):"")+(hours < 10 ? "0" +hours : hours)+":"+
     (minutes < 10 ? "0" +minutes : minutes);
   }

    getSortedStopTimes(neareststops)
    {
	if (!neareststops)
	    return neareststops;
 	let ret = neareststops.sort(function(a, b){
	    let a_realtimeArrival = a.realtimeArrival;
	    let b_realtimeArrival = b.realtimeArrival;
	    let a_scheduledArrival = a.scheduledArrival;
	    let b_scheduledArrival = b.scheduledArrival;

	    let a_Arrival = a_scheduledArrival;
	    if (a_Arrival != a_realtimeArrival)
		a_Arrival = a_realtimeArrival;
	    let b_Arrival = b_scheduledArrival;
	    if (b_Arrival != b_realtimeArrival)
		b_Arrival = b_realtimeArrival;
	    return a_Arrival === b_Arrival;
	});
	return ret;
    }

    getMsSinceMidnight(d) {
        var e = new Date(d);
        return d - e.setHours(0,0,0,0);
      }

    getArriveTime(secondsfrommignight)
    {
	  if (!secondsfrommignight)
	    return null;
	let ret = this.getMsSinceMidnight(secondsfrommignight);
	return ret;
    }
	
    getNeareststoptimes(neareststops)
    {
        let arrSize = neareststops.length;
        let arrstoptimes = new Array(arrSize);
        let stoptime = null;
        let neareststoptimes = null;
        
        // calculate arrivetime into new array of new objects:
        let i = 0, h = 0;
        
        for(i = 0; i < arrSize; i++)
        {
            stoptime = { ... neareststops[i] };
            let realtimeArrival = stoptime.realtimeArrival;
            let scheduledArrival = stoptime.scheduledArrival;
            let Arrival = scheduledArrival;
            if (Arrival == null || (Arrival != null && realtimeArrival != null && Arrival != realtimeArrival))
            Arrival = realtimeArrival;
            stoptime.arrivetimeseconds = Arrival;
            stoptime.arrivetime = this.getArriveTime(Arrival); // this.getArriveTime(stoptime.arrivetimeseconds);   
            stoptime.strarrivetime = this.seconds_to_days_hours_mins_str(stoptime.arrivetimeseconds);
            arrstoptimes[i] = stoptime;
        }

        // sort after arriveseconds:
        let sorted = arrstoptimes.sort(function(a,b){
            return a.strarrivetime === b.strarrivetime;
        });
            
        return sorted;
    }

    getHourFilteredStopTimes(h, sorted)
    {
      if (Config.bDebug)
      {
        console.log("getHourFilteredStopTimes");
        console.log(h);
      }

	let ret = null;
	if (h < 0 || h > 24)
        return null;
    if (!sorted)
	    return null;
    if (h == 0)
    {
        h = "00";
        console.log(h);
      ret = sorted.filter(a => a.strarrivetime.startsWith("24") || a.strarrivetime.startsWith("00") ) ;
        console.log("ret");
        console.log(ret);
        return ret;
    }
    else   
    if (h < 10)
        h = "0" +h;
    else
        h = "" +h;

    console.log(h);
    ret = sorted.filter(a => a.strarrivetime.startsWith(h));
    console.log("ret");
    console.log(ret);
    return ret;

        /*
	let i = 0;
	for(i = 0; i < sorted.length; i++)
	{
	}
    return ret;
    */
    }
	
    handleResponseData(response)
    {
            let i = 0;
            let bSearch = false;
            const features = response.data.features;
            let feature, coordinates, street;
            let bExactAdressFound = false;
 
            for (i in features) {
                feature = features[i];
                coordinates = feature.geometry.coordinates;
                street = feature.properties.name;      
                if (Config.bDebug)
                {
                console.log("coordinates:" +coordinates);
                console.log("street:" +street);
                }
                if (street != null && street.toString() == this.props.address.toString())
                {
                    bExactAdressFound = true;
                    if (Config.bDebug)
                    console.log("bExactAdressFound:" +bExactAdressFound);
                    break;
                }
            } 
         
            if (bExactAdressFound)
            {
              if (Config.bDebug)
                console.log("bExactAdressFound2:" +bExactAdressFound);
                let addressfeature = new Object();
               if (this.props.address.length > 0)
                    bSearch = true;
                let afeatures = [ feature ];
                coordinates = feature.geometry.coordinates;
                street = feature.properties.name;
                this.setState({ searchstops: bSearch });
                this.setState( { addressfeatures: afeatures } );
            }
            else
            {
              if (Config.bDebug)
                console.log("features for 2:");
                /*
                for (i in features) {
                    feature = features[i];
                    coordinates = feature.geometry.coordinates;
                    street = feature.properties.name;            
                    console.log("coordinates:" +coordinates);
                    console.log("street:" +street);
                }     
                */
                if (this.props.address.length > 0)
                    bSearch = true;
                this.setState({ searchstops: bSearch });
                this.setState( { addressfeatures: features } );
       
            }
            //console.log(coordinates);
         //   this.render();
    }

    /*
    handleKeyPress = (event) => {
      event.preventDefault();
      if(event.key === 'Enter'){
        console.log('enter press here! ');
        astopClicked(event);
      }
    }
    */

      astopClicked = (event) => {  
          event.preventDefault();

          if (this.state.underServerCall)
          {
            if (Config.bDebug)
              console.log("this.state.underServerCall true");
              return;
          }

          if (Config.bDebug)
          {
            console.log("stopClicked");
            console.log(event.target);
            console.log("href");
          }
            var href = event.target.href;
            if (Config.bDebug)
              console.log(href);  
            var linkid = event.target.id;
            if (Config.bDebug)
              console.log("linkid");
            if (Config.bDebug)
              console.log(linkid);
            let elemid = "ul" +linkid;
            if (Config.bDebug)
              console.log("elemid");
            if (Config.bDebug)
              console.log(elemid);
            // let stoptimesul = this.refs[elemid]
            let stoptimesul = document.getElementById(elemid);
            if (stoptimesul != null)
            {
                // var elem = document.getElementById("myDiv");
              //  this.setState({neareststops: null, linkclicked: false});
                return ;
            } 
            let bvalue = this.state.linkclicked;
            if (Config.bDebug)
            {
              console.log("bvalue");  
              console.log(bvalue);
            }
            if (bvalue)
                this.setState({linkclicked: false});
            else    
            {
              if (this.state.neareststops == null 
                  || this.state.neareststops.length == 0)
                this.makeApolloCallForNearestStopTimes(href);
              this.setState({linkclicked: true});
            }
    }

    seeKAllStopTimes()
    {
        this.setState({linkclicked: false});
        this.makeApolloCallForNearestStopTimes(this.state.stop.place.gtfsId);      
    }

    static getStopIdAfterStartID(stopid)
    {
      if (stopid == null || stopid.trim().length == 0)
        return -1;
      let pos = stopid.indexOf(':');
      if (pos == null || pos == -1)
          return -1;
      let afterId = stopid.substring(pos+1);
      return afterId;    
    }

    static getStopIdAfterStartID(stopid)
    {
      if (stopid == null || stopid.trim().length == 0)
        return -1;
      let pos = stopid.indexOf(':');
      if (pos == null || pos == -1)
          return -1;
      let afterId = stopid.substring(pos+1);
      return afterId;    
    }

    Capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
      }

    render(props) {
        const linkclicked = this.state.linkclicked;
     // const features2 = this.state.addressfeatures; '
     if (Config.bDebug)
     {
        console.log("linkclicked");
        console.log(linkclicked); 
     }

     let openpdflink = null;
     if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_HSL)
       openpdflink = <a target="_blank" id={"open" +this.state.stop.place.gtfsId} 
       href={ Config.CORS_DIGITRANSITSERVER +'/timetables/v1/' +NearestStops.localHSLUri+ '/stops/' +NearStop.getStopIdAfterStartID(this.state.stop.place.gtfsId) +".pdf"}>
        (Avaa aikataulu pdf)</a>;
 
    let opentimetablelink = null;
    if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_HSL)
      opentimetablelink = <a target="_blank" id={"open" +this.state.stop.place.gtfsId} 
      href={Config.HSL_SERVER_URL + "/pysakit/" 
      +this.state.stop.place.gtfsId +"/aikataulu"}>(Avaa kartta-aikataulu sivu)</a>;
    else
    if (NearestStops.localHSLUri == Config.HSLLSERVICEURI_FINLAND)
      opentimetablelink = <a target="_blank" id={"open" +this.state.stop.place.gtfsId} 
      href={Config.FINLAN_SERVER_URL +"/pysakit/" +this.state.stop.place.gtfsId +"/aikataulu"}>
      (Avaa kartta-aikataulu sivu)</a>;

       // console.log("this.state.stop.place" +this.state.stop.place);   
        /*
        let elemid = "ul" +this.state.stop.place.gtfsId;   
        let stoptimesul = document.getElementById(elemid);
        if (stoptimesul != null)
        {
            // var elem = document.getElementById("myDiv");
            stoptimesul.parentNode.removeChild(stoptimesul);
        }
        */

    if (!linkclicked)
    /*
        if (this.state.stop == null || this.state.stop.place == null || this.state.stop.place == undefined
            || this.state.stop.place.locationType == null || this.state.stop.place.locationType == undefined)
            return null;
        else
        */

        /*
                        <space>  </space>{openpdflink}<space>  </space>
                {opentimetablelink}
        */
            return ( 
                <div id="routelinkofstopdiv" data-message="osoitteen koordinaatit">
                    <a id={this.state.stop.place.gtfsId} role="link"
                    href={this.state.stop.place.gtfsId}
                    onClick={this.astopClicked}>
                    {this.state.stop.place.locationType == "STOP" ? "" : "Asema"} {this.state.stop.place.code}&nbsp; 
		            {this.state.stop.place.name} {this.state.stop.place.desc} Etäisyys {this.state.stop.distance}</a> 
                </div>
            );
        else
        {
            const neareststops = this.state.neareststops;
            if (Config.bDebug)
            {
              console.log("linkclicked");
              console.log(linkclicked);       
            }

            const neareststoptimes = new Set();
            if (neareststops)   
            {
                let sorted = this.getNeareststoptimes(neareststops);
                if (Config.bDebug)
                {
                  console.log("sorted");
                  console.log(sorted);
                }
                // filter after every hour of a day:
                let hourStopTimes = new Array(24);
                let h = 0, i = 0, iStopTimes = sorted.length;
                let arrHourStopTimes = new Set();
                /*
                for(h = 0; h < 25; h++)
                {
                    hourStopTimes[h] = this.getHourFilteredStopTimes(h, sorted);                 
                }
                */

                /*
                if (sorted != null && sorted.length > 0)
                {
                    arrHourStopTimes = sorted.map(stime =>  <StopTime data={stime}/>  );
                     console.log("hourStopTimes 4"); 
                    neareststoptimes.add(<div><h4>{h}</h4>);                     
                    arrHourStopTimes.forEach((item) => neareststoptimes.add(item));
                    neareststoptimes.add(</div>);
                }
                */

                // style={this.props.canClick ? {pointerEvents: "none"} : null}
        // https://reittiopas.hsl.fi/pysakit/HSL:1171180/aikataulu

        //       onKeyPress={this.handleKeyPress}

                return (  // <Fragment>
                 <div id={"routestoptimesofstopdiv" +props.index} data-message="pysäkki"> 
                    <a id={this.state.stop.place.gtfsId} role="link"
                    tabIndex="0"
                    href={this.state.stop.place.gtfsId}                     
                    style={this.props.canClick ? {pointerEvents: "none"} : null}
              
                    onClick={this.astopClicked}>{this.state.stop.place.locationType == "STOP" ? "" : "Asema"} {this.state.stop.place.code} 
		            {this.state.stop.place.name} {this.state.stop.place.desc} Etäisyys {this.state.stop.distance}</a>
                <space>  </space>
                {openpdflink} {opentimetablelink} 
                    <ul id={"ulnearstop" +this.state.stop.place.gtfsId} >                    
                    {sorted.map((stime,i) => <StopTime htmlelement="li" index={i} data={stime}/>)} 
                    </ul>
                    </div>                  
                ); //  </Fragment> 
            }
        }
    }
}

export default  NearStop;
