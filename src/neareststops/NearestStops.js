import { h, Component, useEffect } from 'preact';
import style from '../App.css';
import { useContext } from 'preact/compat';

import GiveNearStopQueryValues from './GiveNearStopQueryValues';
import AddressList from './AddressList';
// import gql from "apollo-boost";
import SearchAndListAddressStops from './searchstops/SearchAndListAddressStops';
// import { withApollo } from 'react-apollo';
import Config from '../util/Config';
import AbortController from "abort-controller";
import StaticFunctions from '../util/StaticFunctions';
import CssDark from  '../context/Context';

/**
 * This class is showing controls of the bus stop query and makes query for near stops.
 */
class NearestStops extends Component 
{
    
    static localHSLUri = Config.HSLLSERVICEURI_HSL;

    abortController = null;
    abortSignal = null;

    alladdresses = null;
    address = null;
    searchstops = false;
    addressfeatures = null;
 
    static getPDFURL()
    {
        return Config.CORS_DIGITRANSITSERVER +"/timetables/v1/";
    }

    static getHslBaseUrl()
    {
        let hsl_baseurl = null;
        if (!Config.bUseOwnGatewayServer)
        {
          hsl_baseurl = Config.CORS_DIGITRANSITSERVER;
        }
        else
        if (window.location.origin) {
            hsl_baseurl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? Config.HSL_LOCAL_PORT +'/hsl/' : Config.HSL_LOCAL_PORT +'/hsl/');
            if (Config.bDebug)
            {
                console.log("hsl_baseurl");
                console.log(hsl_baseurl);
            }
        }
        return hsl_baseurl;
    }

    componentDidMount() {    
    }

    // address_search_url = "https://api.digitransit.fi/geocoding/v1/search?text=";
   // hsl_baseurl = "http://localhost:81NearestStops makeGetQuery before: axios:080/hsl/";
    // hsl_baseurl = window.location.href +":8080/hsl/";
    address_search_url = NearestStops.getHslBaseUrl() +"geocoding/v1/search?text=";
    prev_features = null;

    constructor(props) {
        super(props);
        if (Config.bDebug)
          console.log("NearestStops constructor");

        if (this.props.client != null)
            this.client = this.props.client;

        /*    
        this.abortController = new AbortController(); // 1
        if (Config.bDebug)
        {
          console.log("NearestStops abortController:");
          console.log(this.abortController);
        }
        
        this.abortSignal = this.abortController.signal; // 2
        if (Config.bDebug)
        {
          console.log("NearestStops this.abortSignal:");
          console.log(this.abortSignal);
        }
        */

//        console.log("window.location.href");
//        console.log(window.location.href);
        // hsl_baseurl = window.location.href.
        if (window.location.origin) {
            this.hsl_baseurl = NearestStops.getHslBaseUrl();
            if (Config.bDebug)
            {
                console.log("this.hsl_baseurl");
                console.log(this.hsl_baseurl);
            }
        }
        this.address_search_url = this.hsl_baseurl +"geocoding/v1/search?text=";
          
        this.state = {
            searchstops: false,
            address: null,
            addressfeatures: null,
            longitude: null,
            latitude: null,
        distance: null,
        alladdresses: null,
        chkboxAddressList: false,
        loading: false,
        buttonpressed: false,
        fetched: null,
        seeKAllStopTimes: false, 
        neareststops: null,
        disableCancelButton: true,
        usergivenStartTime: null,
        errorinquery: null,
        loaddarkstyle: false,
        stylechangedattime: null,
        addresscoordinateswrong: false
        }

        this.addresssSelectionChange = this.addresssSelectionChange.bind(this);
    }

    
  componentDidMount() {
    // document.title = “Pysäkit”;
    this.abortController = new AbortController(); // 1        
    this.abortSignal = this.abortController.signal; // 2
  }


    shouldComponentUpdate(nextProps, nextState) { 
      if (nextProps.stylechangedattime != this.state.stylechangedattime)
      {
         this.setState({ errorinquery: "Ulkoasua muutettu", loaddarkstyle: nextProps.loaddarkstyle});
      }
      return true;
        /*      
        if(this.state.addressfeatures !== nextState.addressfeatures
           || this.state.neareststops !== nextState.neareststops
           || this.state.loading !== nextState.loading
           || this.state.address !== nextState.address)
            { return true }
            return false;
            */
/*
        if(this.state.addressfeatures !== nextState.addressfeatures)
            { return true }
        if(nextState.addressfeatures == null)
            { return true }
        if(nextState.address != null && this.state.address != nextState.address)
            { return true }
        if(nextState.alladdresses !== this.state.alladdresses)
            { return true }   
        if(nextState.fetched != this.state.fetched))
            { return true }  
            */          
        return false;
            //    && nextState.fetched != this.state.fetched)
    //
      //  return  (nextState.fetched != null
        //    && nextState.fetched != this.state.fetched)
         //   || nextState.alladdresses !== this.state.alladdresses
//        || nextState.alladdresses !== this.state.alladdresses
     //   || (nextState.addressfeatures != null && this.state.addressfeatures == null)
    }
    
    removeAddressFromArray(array, value)
    {        
        // console.log("removeAddressFromArray");
        if (array == null)
            return array;

        // console.log("removeAddressFromArray 1");
        var i;
        let obj = null;
        for (i = 0; i < array.length; i++) {
            if (array[i] == value)
            {
               // console.log("array 2 i: " +i);
                // console.log(array);
                array.splice(i,i+1);
                /* console.log("array obj");
                console.log(array);
                console.log("removeAddressFromArray 2: " +i);
                */
            }
        } 

            // console.log("array = obj");
           // console.log(array);
        
        return array;
    }
    
    handleResponseData(response)
    {
        if (Config.bDebug)
        {
            console.log("NearestStops handleResponseData");
            console.log("NearestStops response");
            console.log(response);            
        }
        let firstAddress = this.state.address;
        firstAddress = firstAddress.replace(",", "");
        this.address = firstAddress;
        if (Config.bDebug)
            console.log("firstAddress: " +firstAddress);            
        let founded = this.seekRigthAddressFromResponse(response, firstAddress);
        if (Config.bDebug)
            console.log("NearestStops handleResponseData founded: " +founded);
        if (founded == null || founded != null && !founded)
        {
          this.setState({loading: false, addresscoordinateswrong: true})
        }
        let earlieraddress = null;

        while(!founded && firstAddress != null && firstAddress.length > 1 && 
              firstAddress.trim() != '')
        {
            if (Config.bDebug)
                console.log("- NearestStops handleResponseData founded: " +founded);
            firstAddress = this.removeLastWord(firstAddress);
            if (earlieraddress == firstAddress)
            {
              if (Config.bDebug)
                console.log("- NearestStops handleResponseData earlieraddress == firstAddress: " +firstAddress);
                break;
            }
            console.log("- NearestStops handleResponseData firstAddress: " +firstAddress);
            if (firstAddress != null)
                founded = this.seekRigthAddressFromResponse(response, firstAddress);
            earlieraddress = firstAddress;
            if (Config.bDebug)
                console.log("- NearestStops handleResponseData founded: " +founded);
        }

        if (!founded)
        {
          if (Config.bDebug)
            console.log("<= NearestStops handleResponseData founded: " +founded);
            this.setState({ fetched: new Date(), addressfeatures: null});
            return;
        }

        this.address = firstAddress;
        /*
        let addrs = this.alladdresses;
        if (this.alladdresses != null)
            addrs = this.removeAddressFromArray(this.alladdresses, this.address);
        this.setState({ alladdresses: addrs, address: this.address, 
            searchstops: this.searchstops, addressfeatures: this.addressfeatures,
            fetched: new Date() });
            */

        if (Config.bDebug)
        {
            console.log("NearestStops handleResponseData founded");
            console.log(founded);
        }
        this.makeApolloCallForNearestStops(this.addressfeatures);
    }

    removeLastWord(firstAddress)
    {
        if (firstAddress == null || firstAddress == '')
            return firstAddress;
        let lastIndex = firstAddress.lastIndexOf(" ");
        if (lastIndex < 0)
            return firstAddress;
        let ret = firstAddress.substring(0, lastIndex);
        if (Config.bDebug)
        {
            console.log("ret");
            console.log(ret);
        }
        return ret;
    }

    seekRigthAddressFromResponse(response, address)
    {
            let i = 0;
            let bSearch = false;
            const features = response.features; // response.data.features;
            let feature, coordinates, street, label;
            let bExactAdressFound = false;
            let alladdresses = [];
            let found_address = null;
            let found_feature = null;
     
            for (i in features) {
                feature = features[i];
                if (Config.bDebug)
                  console.log("feature:");
                if (Config.bDebug)
                  console.log(feature);
                coordinates = feature.geometry.coordinates;
                street = feature.properties.name;
                label = feature.properties.label;

                if (Config.bDebug)
                {
                    console.log("coordinates:'" +coordinates +"'");
                    console.log("street:'" +street +"'");
                    console.log("address:'" +address +"'");
                    console.log("label:'" +label +"'");
                }
                //if (street != null)
                if (label != null)
                {
                   //alladdresses.push(street);
                   alladdresses.push(label);
                }
                if (bExactAdressFound)
                    continue;
            
                let strLabel = null;
                if (label != null)
                { 
                  strLabel = label.toString().replace(/,/g, '').replace(/\s{1,}/, '');
                  if (Config.bDebug)
                    console.log("  strLabel:'" +strLabel +"'");                 
                }
                let strAddress = null;
                if (address != null)
                {
                  strAddress = address.toString().replace(/,/g, '').replace(/\s{1,}/, '');
                  if (Config.bDebug)
                    console.log("strAddress:'" +strAddress +"'");
                }
                  if (street != null && 
                  (strLabel == strAddress
                  || street.toString() == address.toString()))
                {
                    bExactAdressFound = true;
                    found_address = street;
                    this.address = found_address;
                    found_feature = feature; 
                    if (Config.bDebug)
                    console.log("bExactAdressFound:" +bExactAdressFound);
                    if (Config.bDebug)
                    console.log("address:" +address);
                    continue;
                }
            } 

            if (Config.bDebug)
            {
                console.log("this.setState({ alladdresses: alladdresses });");
                console.log(alladdresses);
            }
            this.alladdresses = alladdresses;
            if (bExactAdressFound)
            {
                if (Config.bDebug)                
                    console.log("bExactAdressFound2:" +bExactAdressFound);
                let addressfeature = new Object();
               if (this.state.address.length > 0)
                    bSearch = true;
                let afeatures = [ found_feature ];
                this.searchstops = bSearch;
                // this.setState({ searchstops: bSearch });
                this.addressfeatures = afeatures;
                // this.setState( { addressfeatures: afeatures } );
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
                if (this.state.address.length > 0)
                    bSearch = true;
                this.searchstops = bSearch;
                //this.setState({ searchstops: bSearch });
                this.addressfeatures = features;
                // this.setState( { addressfeatures: features } );
              // this.render();
            }
            //console.log(coordinates);
         //   this.render();
         return bExactAdressFound;
    }

    makeGetQuery(addressparam)
    {
        if (!addressparam || addressparam.length == 0 )
        {
            this.setState( { addressfeatures: null } );
            return;
        }
        if (Config.bDebug)
        {
          console.log("makeGetQuery:addressparam");
          console.log(addressparam);
        }      
        if (Config.bDebug)
            console.log("NearestStops makeGetQuery before: axios:" );
        const test = this.address_search_url +addressparam;
        if (Config.bDebug)
            console.log("url:" +test  );
         const decodedurl = this.address_search_url +encodeURIComponent(addressparam);
         
         if (Config.bDebug)
            console.log("decodedurl:" +decodedurl  );
       this.setState({ loading: true, addresscoordinateswrong: false });

       fetch( decodedurl)
       .then(response => { return response.json();})
       .then(data => { 
          if (Config.bDebug)
          {
            console.log("data");
            console.log(data);
          }
          this.handleResponseData(data);
        })
        .catch((error) => {
          console.error("error");
          console.error(error);
          this.setState({ loading: false, disableCancelButton: true, 
            errorinquery: error, er });
          return;
      });
    
       //axios.get(decodedurl)
         //   .then(response => this.handleResponseData(response));
    }

    addresssSelectionChange = (addressparam) => {
      if (addressparam == null || addressparam.toString().length == 0)
        return;
      let usergivenStartTime = this.state.usergivenStartTime;
      let distance = this.state.distance;
      this.addresssSelected(addressparam, distance, usergivenStartTime);
    }

    addresssSelected = (addressparam, distanceparam, startimeparam) => 
    {
        if (Config.bDebug)
        {
            console.log("NearestStops addresssSelected.addressparam=" +addressparam);
            console.log("NearestStops addresssSelected.distanceparam=" +distanceparam);
            console.log("NearestStops addresssSelected.startimeparam=" +startimeparam);            
        }

        if (distanceparam == null)
            distanceparam = 800;
        else
        if (distanceparam.trim().length == 0)
           distanceparam = 800;

        if (startimeparam == null)
          startimeparam = '';
        else
        if(startimeparam.toString().trim().length == 0)
          startimeparam = '';
                       
        addressparam = StaticFunctions.trimMidleSpacies(addressparam);
       
            //  loading: true,
        this.setState({
            address: addressparam,
        distance: distanceparam,
        usergivenStartTime: startimeparam, // use this value when creating 
        // particular stoptime(s)
        searchstops: null,
        addressfeatures: null
        });


        let bSearch = false;
        if (addressparam.length > 0)
        {
            bSearch = true;
            this.setState({
                searchstops: bSearch,
                buttonpressed: true,
                address: addressparam
            });
            this.makeGetQuery(addressparam, distanceparam);
        } 
        if (Config.bDebug) 
            console.log("bSearch2");
       
            /*
        this.setState({
            loading: false
            });
            */
            
    }

    handleAddressListChangeChk = () => {
        this.setState({
            chkboxAddressList: !this.state.chkboxAddressList
        });
        if (Config.bDebug)
            console.log(this.state);
     //   React.render(this, document.getElementById('div.ListAddresses'));
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
          this.setState({seeKAllStopTimes: false, neareststops: null,
            disableCancelButton: false});
  
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
          
      let distanceparam = this.state.distance;
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
        console.log("fetch url: " +Config.CORS_DIGITRANSITSERVER +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql');
      //  console.log("fetch url: " +this.hsl_baseurl +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql');
  
      this.setState({errorinquery: null});

     //fetch( this.hsl_baseurl +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql', {
      StaticFunctions.postData( Config.CORS_DIGITRANSITSERVER +'routing/v1/routers/' +NearestStops.localHSLUri+ '/index/graphql',  {        
        method: 'POST',
        signal: this.abortSignal,
        headers: {"Content-Type": "application/graphql",  'Accept': '*/*'},        
        body: body })
        .then(response => { return response.json();})
        .then(responseData => {if (Config.bDebug) console.log(responseData.data);
           return responseData.data;})
        .then(data => { 
        if (Config.bDebug)
        {
        console.log("data");
        console.log(data);
        console.log(data.nearest.edges);
        }
        let addrs = this.alladdresses;
        if (this.alladdresses != null)
            addrs = this.removeAddressFromArray(this.alladdresses, this.address);
        this.setState({ alladdresses: addrs, address: this.address, 
            searchstops: this.searchstops, 
            addressfeatures: this.addressfeatures,
            fetched: new Date(),
            uncheckCheckBox: true,
            neareststops: data.nearest.edges,
            loading: false, 
            disableCancelButton: true
         });
        })      
      .catch((error) => {
          console.error("error");
          console.error(error);
          this.setState({ loading: false, disableCancelButton: true, 
            errorinquery: error, er });
          return;
      });
    
      if (Config.bDebug)
             console.log("makeApolloCallForNearestStops 3" );
          this.setState({ latitude: latitude, longitude: longitude });
          // this.coordinateschanged(latitude, longitude);
  }

  coordinateschanged = ( latitude, longitude ) => 
  {
        if (Config.bDebug)
          console.log("coordinateschanged: lat " +latitude +" lon " +longitude);
        this.setState({ latitude: latitude, longitude: longitude});
      }

      stopAddresssSelected = () => {
        if (Config.bDebug)
          console.log("abortController.abort()");
        if (this.state.loading && !this.abortController.aborted)
        {
            this.abortController.abort();
            this.setState({ loading: false});
        }
  }

  getUsergivenStartTime(usergivenStartTime)
  {
      this.setState({usergivenStartTime: usergivenStartTime });
  }

   render(props, state) {
        const cssDark = useContext(CssDark);

        if (Config.bDebug)
        {
            console.log("NearestStops render()");
            console.log("props");
            console.log(props);
            console.log("state");
            console.log(state);
            console.log("state.neareststops");
            console.log(state.neareststops);
        }
    
        const search = (state.searchstops != null && state.addressfeatures != null);
        if (Config.bDebug)
        {
            console.log("NearestStops search?" +search);
            console.log("state.addressfeatures");
            console.log(state.addressfeatures);
            console.log("state.neareststops");
            console.log(state.neareststops);
            console.log("search");
            console.log(search);
        }
        let searchAndListAddressStops = null;
        let addresslist = null;
        if (search)
            addresslist = <AddressList style={style.page} 
            addresssselected={this.addresssSelectionChange} 
            distance={state.distance} 
            alladdresses={state.alladdresses}
            addressfeatures={state.addressfeatures}
            handleChangeChk={this.handleAddressListChangeChk}
            chkbox={this.state.chkboxAddressList}
            />;


        if (Config.bDebug)
        {
            console.log("NearestStops render-> addresses");
            console.log("state.alladdresses");
            console.log(state.alladdresses);
            console.log("addresslist");
            console.log(addresslist);
         }

        if (search)
        searchAndListAddressStops = <SearchAndListAddressStops key="searchandlistaddressstops"
            address={state.address} distance={state.distance} 
            addressfeatures={state.addressfeatures} 
            addresssselected={this.addresssSelected} 
            coordinateschanged={this.coordinateschanged}
            latitude={state.latitude} longitude={state.longitude}
            neareststops={state.neareststops} 
            usergivenStartTime={state.usergivenStartTime}            
            />;
        
        let loadingComp = null;
        let loading = this.state.loading;
        let bButtonPressed = this.state.buttonpressed;
        if (loading == false && bButtonPressed && searchAndListAddressStops != null)
           loadingComp = <p className={"p" +cssDark} tabIndex="0" style={style.political_p} aria-label="Tulokset alla">Tulokset alla.</p>;
        else
        if (loading && bButtonPressed && searchAndListAddressStops == null)
           loadingComp = <p className={"p" +cssDark} tabIndex="0" style={style.political_p} aria-label="Ladataan">Ladataan...</p>;
        else        
        if (loading == false && bButtonPressed && state.addresscoordinateswrong
           && searchAndListAddressStops == null)
           loadingComp = <p className={"p" +cssDark} tabIndex="0" style={style.political_p} >Osoite tuntematon. Ei leveys ja pituusosoitekoordinaatteja haun jälkeen</p>;
        else        
        if (loading == false && bButtonPressed && searchAndListAddressStops == null)
           loadingComp = <p className={"p" +cssDark} tabIndex="0" style={style.political_p} aria-label="Ei tuloksia">Ei tuloksia.</p>;
        else
        if (loading == false && bButtonPressed && state.errorinquery != null)
           loadingComp = <p className={"p" +cssDark} tabIndex="0" style={style.political_p} aria-label="Virhe kyselyn suorituksessa">Virhe kyselyn suorituksessa.</p>           

        return (  
          <section className={"section" +cssDark}>
            <h1 className={"h" +cssDark} tabIndex="0">Hae pysäkkejä osoitteen mukaan</h1>
            <GiveNearStopQueryValues style={style.page} distance={state.distance} 
            addresssselected={this.addresssSelected} address={state.address} 
            stopAddresssSelected={this.stopAddresssSelected}
            disableCancelButton={this.state.disableCancelButton}
            addresscoordinateswrong={state.addresscoordinateswrong}
            errorinquery={state.errorinquery}
             /> 
           {addresslist}
           <div className={"div" +cssDark} id="loadingComp2" aria-live="polite">{loadingComp}</div>
           {searchAndListAddressStops}
           </section>
        );
    }
}

//export default withApollo(NearestStops);
export default NearestStops;
