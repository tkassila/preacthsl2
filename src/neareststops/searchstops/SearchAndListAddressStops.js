import React, { Component, Fragment } from 'preact';
import { useContext } from 'preact/compat';
import Address from '../Address.js';
import NearStop from './NearStop';
// import axios from 'axios';
// import gql from "apollo-boost";
import Checkbox from '../../components/Checkbox';
import NearestStops from '../NearestStops';
import Config from '../../util/Config';
import style from '../../App.css';
import ShowUserStartTime from './ShowUserStartTime.js';

// import ApolloClient from "apollo-boost";
// import gql from "apollo-boost";
// import { withApollo } from 'react-apollo';
// import { url } from 'inspector';
// import { type } from 'os';

/**
 * This class used to show and query user intputs before query bus stops.
 */
class SearchAndListAddressStops extends Component 
{
   // address_search_url = "https://api.digitransit.fi/geocoding/v1/search?text=";
    hsl_baseurl = null;
    // address_search_url = "http://localhost:8080/hsl/geocoding/v1/search?text=";
    address_search_url = null;
    prev_features = null;
    nearestopsmap = null;
    new_neareststops = null;
         
  
    constructor(props) {
        super(props);
        if (Config.bDebug)
        {
          console.log("SearchAndListAddressStops constructor(props)");
          console.log(props);
          console.log("SearchAndListAddressStops props.neareststops");
          console.log(props.neareststops);
        }
        this.hsl_baseurl = Config.hsl_baseurl;
        this.address_search_url = this.hsl_baseurl +"geocoding/v1/search?text=";
        this.nearestopsmap = null;
        
        this.state = {
            searchstops: (props.neareststops != null),
            address: props.address,
            addressfeatures: props.addressfeatures,
            neareststops: props.neareststops,
            seeKAllStopTimes: false,
            showShowlatlon: false,
            uncheckCheckBox: false,
            distance: props.distance,
            alladdresses: props.alladdresses,      
            new_neareststops: null,    
            loading: false
        }
     
        if (this.props.client)
        {
            this.client = this.props.client;
            if (Config.bDebug)
            console.log("SearchAndListAddressStops this.props.client");
        }

        if (Config.bDebug)
        {
            if (this.client)
              console.log("client=" +this.client);
            else
              console.log("null: client" );
        }
        
        this.removeThisStopNoStoptimes = this.removeThisStopNoStoptimes.bind(this);
      //  this.makeGetQuery();
    }

    shouldComponentUpdate(nextProps, nextState) {      
      return true;
    }

    componentWillMount()
    {
       /*
        if (this.props.longitude !== null && this.props.latitue !== null)
        {
             this.makeApolloCallForNearestStopsAfterLongitudeAndLatitue(this.props.longitude, this.props.latitue);
        }
        else
        if (this.props.address)
        {
            this.makeApolloCallForNearestStops(this.props.addressfeatures, this.props.distance);
            this.setState( {
                searchstops: true,
                address: this.props.address,
                addressfeatures: this.props.addressfeatures,
	            	distance: this.props.distance
            });            
        }
        */
    }

    componentWillReceiveProps(nextProps) 
    {
      /*
      if (this.props.longitude !== nextProps.longitude 
        && this.props.latitue !== nextProps.latitue)
      {
        ?*
        if (nextProps.longitude && nextProps.latitue)
        {
          *?
           this.makeApolloCallForNearestStopsAfterLongitudeAndLatitue(nextProps.longitude, nextProps.latitue);      
       // }
      }
      else
      {
         if (this.props.address !== nextProps.address) {
           this.setState({address: nextProps.address, neareststops: null});
        }        
        if (this.props.addressfeatures !== nextProps.addressfeatures) {
            this.setState({addressfeatures: nextProps.addressfeatures, neareststops: null});
          }
          if (this.props.addresssselected !== nextProps.addresssselected) {
            this.setState({addresssselected: nextProps.addresssselected, neareststops: null});
          }        
         this.makeApolloCallForNearestStops(nextProps.addressfeatures)        
      }
      */
     }

     makeApolloCallForNearestStops(addressfeatures)
    {
      if (Config.bDebug)
      {
        console.log("makeApolloCallForNearestStops 1 1" );
        console.log(addressfeatures );
      }
        let coordinates = null;
        
        coordinates = addressfeatures.map((feature) => { return (feature && feature.geometry && feature.geometry.coordinates ? feature.geometry.coordinates : null); });
        if (Config.bDebug)
        console.log(coordinates );
        let longitude = coordinates[0][1];
        let latitude = coordinates[0][0];
        this.makeApolloCallForNearestStopsAfterLongitudeAndLatitue(longitude, latitude)
    }

    makeApolloCallForNearestStopsAfterLongitudeAndLatitue(longitude, latitude)
    {
      if (Config.bDebug)
      {
        console.log("longitude ");
        console.log(longitude );
        console.log("latitude ");
        console.log(latitude );
      }
        this.nearestopsmap = null;        
        this.setState({seeKAllStopTimes: false, neareststops: null});
        /*
        fetch('https://api.github.com/gists', {
    method: 'post',
    body: JSON.stringify({
        description: 'Fetch API Post example',
        public: true,
        files: {
          'test.js': {
            content: 'kissa'
          }
        }
      })
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.error('Created Gist:', data.html_url);
  });

  console.log("makeApolloCallForNearestStops 2" );
  */

  const options = {
    method: 'POST',
    data: `{
      stopsByRadius(lat:60.199,lon:24.938,radius:500) {
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
  
    let distanceparam = this.props.distance;
    if (distanceparam == null || distanceparam.trim().length == 0)
      distanceparam = 800;
	// maxResults: 10,
  let body = `{ nearest(lat: ` +longitude +`, lon: ` +latitude +`,  
    maxDistance: ` +distanceparam +`, filterByPlaceTypes: [STOP, BIKE_PARK]) {
    edges {
      node {
          place {
            lat
            lon
            ...on Stop {
              name
              gtfsId
              code
              desc
              vehicleType
              locationType              
            }
            ...on BikePark {
              name
              bikeParkId
              spacesAvailable
            }
          }
          distance
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
      console.log("fetch url: " +this.hsl_baseurl +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql');

    StaticFunctions.postData( this.hsl_baseurl +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/graphql",  'Accept': '*/*'},
    body: body })
    .then(response => { return response.json();})
    .then(responseData => {if (Config.bDebug) console.log(responseData.data); return responseData.data;})
    .then(data => { 
      if (Config.bDebug)
      {
      console.log("data");
      console.log(data);
      console.log(data.nearest.edges);
      }
      this.setState({ uncheckCheckBox: true, neareststops: data.nearest.edges }) }
      )
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
        this.setState({ latitude: latitude, longitude: longitude });
        this.props.coordinateschanged(latitude, longitude);
    }

    /*
    componentDidMount() {
        this.makeGetQuery();
    }
    */

    componentDidUpdate()
    {
      // this.setState({new_neareststops: null});
    }

    makeGetQuery()
    {
        if (!this.props.searchstops && this.props.address.length == 0)
            return;
        if (this.props.address.length == 0)
            return;
        if (Config.bDebug)
        console.log("before: axios:" );
        const test = this.address_search_url +this.props.address;
        console.log("url:" +test  );
         const decodedurl = this.address_search_url +encodeURIComponent(this.props.address);
         if (Config.bDebug)
         console.log("decodedurl:" +decodedurl  );

         fetch( decodedurl)
         .then(response => { return response.json();})
         .then(data => { 
            if (Config.bDebug)
            {
              console.log("data");
              console.log(data);
            }
            this.handleResponseData(data)
          })
          .catch((error) => {
            console.error("error");
            console.error(error);
            this.setState({ loading: false, disableCancelButton: true, 
              errorinquery: error, er });
            return;
        });
       // axios.get(decodedurl)
         //   .then(response => this.handleResponseData(response));
    }

    handleResponseData(response)
    {
      let firstAddress = this.props.address;
      let founded = seekRigthAddressFromResponse(response, firstAddress);
      while(!founded && firstAddress != null )
      {
        founded = seekRigthAddressFromResponse(response, firstAddress);
      }
    }

    seekRigthAddressFromResponse(response, address)
    {
            let i = 0;
            let bSearch = false;
            const features = response.features; // response.data.features;
            let feature, coordinates, street;
            let bExactAdressFound = false;

            for (i in features) {
                feature = features[i];
                coordinates = feature.geometry.coordinates;
                street = feature.properties.name;      
                if (Config.bDebug)      
                console.log("coordinates:" +coordinates);
                if (Config.bDebug)
                console.log("street:" +street);
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
               if (address != null && address.length > 0)
                    bSearch = true;
                let afeatures = [ feature ];
                coordinates = feature.geometry.coordinates;
                street = feature.properties.name;
                this.setState({ searchstops: bSearch, addressfeatures: afeatures } );
                return true;
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
                this.setState({ searchstops: bSearch, addressfeatures: features } );
                return false;       
            }
            //console.log(coordinates);
         //   this.render();
    }

    addresssSelected = (addressparam, distance) => {      
      if (Config.bDebug)  
        console.log("addresssSelected.addressparam=" +addressparam);
      if (!distance || distance == '')
        distance = '1500';
        
        this.setState({
            address: addressparam,
            searchstops: false,
            addressfeatures: null,
	          distance: distance
        });
        let bSearch = false;
    
        if (Config.bDebug)
        {
        console.log("addressparam=" +addressparam);
        console.log("bSearch=" +bSearch);
        console.log("distance=" +distance);
        }

	      this.setState({ ... this.state, distance: distance });
	
     //   React.render(this, document.getElementById('div.ListAddresses'));
       /* axios.get("https://api.digitransit.fi/geocoding/v1/search?text=kamppi&size=1")
        .then(response =>  console.log(response.data));
*/
//        then(response => this.setState({username: response.data.name}))
      if (Config.bDebug)
        console.log("bSearch2");
      }

      handleChecboxShowAllStopTimes = (id, label, isChecked) =>
      {
        if (Config.bDebug)
        {
        console.log("handleChecboxShowAllStopTimes");
        console.log("id");
        console.log(id);
        console.log("label");
        console.log(label);
        console.log("isChecked");
        console.log(isChecked);
        }

        if (Config.bDebug)
        {
          console.log("this.nearestopsmap");
          console.log(this.nearestopsmap);
        }
    if (isChecked && this.nearestopsmap != null ) 
        {
          if (Config.bDebug)
            console.log("isChecked && this.nearestopsmap != null");
          this.setState({seeKAllStopTimes: true});
        }
        else
        if (!isChecked && this.nearestopsmap != null ) 
        {
          if (Config.bDebug)
            console.log("!isChecked && this.nearestopsmap != null");
          this.setState({seeKAllStopTimes: false});
        }
    }

    
    handleChecboxShowlatlon = (id, label, isChecked) =>
    {
      if (isChecked /* && this.addressdata != null && this.addresstargetdata != null */ ) 
      {
          this.setState({showShowlatlon: true});
      }
      else
      if (!isChecked /* && this.addressdata != null && this.addresstargetdata != null */ ) 
      {
          this.setState({showShowlatlon: false});
      }
    }

    removeThisStopNoStoptimes(removeStop)
    {
        if (Config.bDebug)
        {
          console.log("removeThisStopNoStoptimes");
          console.log("removeStop");
          console.log(removeStop);
        }
        if (removeStop == null)
            return;
        if (this.state.neareststops == null)
            return;
        let newlist = new Array();
        let ind = 0;
        let bFound = false;
        this.state.neareststops.forEach(stop => {     
          console.log("stop");                 
            if (stop.index != removeStop)
            {
              newlist[ind] = stop;
              bFound = true;
            }
            ind++;
       });

    //   if (bFound)
      //    this.new_neareststops = newlist;

        if (Config.bDebug)
        {
          console.log("removeThisStopNoStoptimes");
          console.log("newlist");
          console.log(newlist);
        }
        let removedivnode = document.getElementById("neartopli" +removeStop);
        if (Config.bDebug)
        {
          console.log("removeThisStopNoStoptimes");
          console.log("removedivnode");
          console.log(removedivnode);
        }
        // not call this: because js object will remove and ul/li item remains: this.setState({ neareststops: newlist});
        if (removedivnode != null)
        {
          let nearestopsmapdivnode = document.getElementById("nearestopsmapul");
          if (Config.bDebug)
          {
            console.log("nearestopsmapdivnode");
            console.log(nearestopsmapdivnode);
          }
          if (removedivnode.parentNode) {
            if (Config.bDebug)
              console.log("removedivnode.parentNode");
            removedivnode.parentNode.removeChild(removedivnode);
          }
          else        
            nearestopsmapdivnode.removeChild(removedivnode);
          if (Config.bDebug)
            console.log("nearestopsmapdiv.removeChild(removedivnode)");
        }
    }

    render(props, state) 
    { 
        let itemStyles = { padding: 0 };
           
        const search = state.searchstops;
        if (Config.bDebug)
        {
        console.log("SearchAndListAddressStops::render(props, state)");
        console.log("rendering");
        console.log("search="+search);
        console.log("state.addressfeatures");
        console.log(state.addressfeatures);
        }
        // const features2 = this.state.addressfeatures;        
        let coordinates, street;
       if (search && state.addressfeatures /* && (this.prev_feature == null 
          || this.prev_feature != this.state.addressfeatures) */)
       {
           /*
           const features2 = this.state.addressfeatures.map((feature) => {
            return (
            <p>{feature.properties.name +" " +feature.geometry.coordinates}</p>
           );                    
           } 
        );
        */
            let childrenSize = state.addressfeatures.length;
            console.log("childrenSize:" +childrenSize);
            let children = state.addressfeatures;
            let features2 = null;
            /* features2 = state.addressfeatures.map((feature) => {
                return (
                  <Address address={feature.properties.name +" " +feature.geometry.coordinates} 
                  addresssselected={null}/>
               );                    
               } 
               );
               */
               if (Config.bDebug)
               console.log("this.state.neareststops:" +state.neareststops);
               
            const loading = this.state.loading;
            let loadingComp = null;
            if (loading && state.neareststops == null)
               loadingComp = <h4 aria-label="Ladataan">Ladataan...</h4>;            
            else
            if (!loading && state.neareststops == null)
               loadingComp = <h4 tabIndex="0" aria-label="Ei tuloksia">Ei tuloksia.</h4>;
            
               /*
            coordinates = feature.geometry.coordinates;
            street = feature.properties.name;            
            console.log("coordinates:" +coordinates);
            console.log("street:" +street);
            */
            if (Config.bDebug)
              console.log("this.state.neareststops:" +state.neareststops);
            if (state.neareststops != null)
            {
                let nstops = state.neareststops;
                /*
                if (!state.isChecked && this.new_neareststops != null)
                {
                  if (Config.bDebug)
                  console.log("this.new_neareststops != null:");
                      nstops = this.new_neareststops; 
                  this.new_neareststops = null;                
                }
                */
                this.nearestopsmap = nstops.map((edge, i) => {
                  if (edge.node != null && edge.node.place != null && edge.node.place != undefined
                    && edge.node.place.locationType != null && edge.node.place.locationType != undefined)
                return (
                  <li id={"neartopli" +i} key={"neartopli" +i} styles={itemStyles}>
                    <NearStop key={"nearstop" +i} index={i} stop={edge.node} 
                  seeKAllStopTimes={this.state.seeKAllStopTimes}
                  showShowlatlon={this.state.showShowlatlon}
                  usergivenStartTime={props.usergivenStartTime}
                  removeThisStopNoStoptimes={this.removeThisStopNoStoptimes}
                   /></li>
                ); 
              } 
              );
            }

             let uncheckCheckBox = (state.uncheckCheckBox);
             if (Config.bDebug)
             console.log("uncheckCheckBox");
             if (Config.bDebug)
             console.log(uncheckCheckBox);
             
             let features3 = <Checkbox id="idChecboxShowAllStopTimes" 
                 label="Näytä kaikkien pysäkkien pysähtymisajat" 
                 handleCheckboxChange={this.handleChecboxShowAllStopTimes} 
                 isChecked={uncheckCheckBox == true ? false : state.seeKAllStopTimes} 
                 />;

             let features4 = <Checkbox id="idChecboxShowShowlatlon" 
                 label="Näytä pysäkkien pituus ja leveyspiiri arvot avattaessa" 
                 handleCheckboxChange={this.handleChecboxShowlatlon} 
                 isChecked={state.uncheckCheckBox == true ? false : state.showShowlatlon}             
                 />;
     
          //  if (!neareststops)
            this.prev_feature = state.addressfeatures;              

            let ustarttime = props.usergivenStartTime;
            if (Config.bDebug)
            {
              console.log("ustarttime");
              console.log(ustarttime);
            }
           
            if (ustarttime != null 
                && ustarttime.toString().hasDataAfterTrim())
                ustarttime = <ShowUserStartTime starttime={ustarttime}/>;
            //   <ul role="listbox" aria-label="reittiehdotuksia" style={style.ul}>
            //    {this.nearestopsmap}</ul>               
            // 
            const divstyle = { padding_left: 0 };
            return (
                <Fragment>
                <h3 tabIndex="0">{state.address}:n pysäkit (pit {props.longitude} lev {props.latitude})</h3>
                {ustarttime}
                <p></p>
                {features3}
                <p/>
                {features4}
                <p/>
                <div id="loadingComp1" aria-live="polite">{loadingComp}</div>
                {features2}              
                <div id="nearestopsmapdiv" role="navigation">
                <ul id="nearestopsmapul" style={style.ul}>
                  {this.nearestopsmap}
                </ul>
                </div>
                </Fragment>
            );
       }
        else
        return (
            <Fragment>
            </Fragment>
        );
    }
}

//export default  withApollo(SearchAndListAddressStops);
export default  SearchAndListAddressStops;
