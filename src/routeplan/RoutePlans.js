import { h, Component } from 'preact';
import NearestStops from '../neareststops/NearestStops';
import GiveAddresses from './GiveAddresses';
import RoutePlan from './RoutePlan';
import Checkbox from '../components/Checkbox';

//import AddressList from '../neareststops/AddressList';
//import SearchAndListAddressStops from '../neareststops/searchstops/SearchAndListAddressStops';
import axios from 'axios';
import style from '../App.css';
import Config from '../util/Config';
import AbortController from "abort-controller";

class RoutePlans extends Component {

    address_search_url = NearestStops.getHslBaseUrl() +"geocoding/v1/search?text=";
    addressdata = null;
    addresstargetdata = null;
    abortController = null;
    abortSignal = null;

    constructor(props) {
        super(props);
        if (Config.bDebug)
          console.log("Routeplan constructor");
        if (this.props.client)
            this.client = this.props.client;

        if (window.location.origin) {
            this.hsl_baseurl = NearestStops.getHslBaseUrl();
            if (Config.bDebug)
            {
              console.log("this.hsl_baseurl");
              console.log(this.hsl_baseurl);
            }
        }
        this.address_search_url = this.hsl_baseurl +"geocoding/v1/search?text=";
          
        this.abortController = new AbortController(); // 1        
        this.abortSignal = this.abortController.signal; // 2

        this.state = {
            searchstops: false,
            address: null,
            target: null,
            addressfeatures: null,
            addressfeaturestarget: null,
            longitude: null,
            latitude: null,
            longitudetarget: null,
            latitudetarget: null,
            plans: null,
            uncheckCheckBox: false,
            showShowAllLegs: false,
            bButtonPressed: false,
            disableCancelButton: true,
            firstaddress: null,
            secondaddress: null,
            firstaddressfeatures: null,
            secondaddressfeatures: null
        }
    }

    
    shouldComponentUpdate(nextProps, nextState) { 
      return true;
  }

  componentDidMount() {
    // document.title = “Pysäkit”;
  }
  

    addresssesSelected = (addressparam, targetparam) => {
      if (Config.bDebug)
      {
          console.log("Routeplan addresssesSelected.addressparam=" +addressparam);
          console.log("Routeplan addresssesSelected.targetparam=" +targetparam);
      }

      this.setState({secondaddress: targetparam, 
                     firstaddress: addressparam})

      /*
      this.setState({
            address: addressparam,
	    target: targetparam
        });
        */
        let bSearch = false;
        if (addressparam.length > 0 && targetparam.length > 0)
        {
          /*
            bSearch = true;
            this.setState({
                searchstops: bSearch,
                address: addressparam,
                target: targetparam
            });
            */
            this.setState({ bButtonPressed: true});
            this.makeGetQuery(addressparam, targetparam);
        }      
        if (Config.bDebug)
          console.log("bSearch2");
      }

      /*
      calladdressresponce = (response, dataname) =>
      {
         console.log("response=>"); 
         console.log(response); 
         this.setState({ addressresponse: response });
      }
      */

      makeGetQuery = async (addressparam, targetparam) =>
      {
          if (addressparam == null || addressparam.trim().length == 0 
            || targetparam == null || targetparam.trim().length == 0 )
          {
              this.setState( { addressfeatures: null, addressfeaturestarget: null } );
              return;
          }

          this.addressdata = null;
          this.addresstargetdata = null;

          this.setState({ loading: true, plans: null });

        //  this.setState( { address: addressparam, target: targetparam } );
          if (Config.bDebug)
            console.log("Routeplan makeGetQuery before: axios:" );
          const test = this.address_search_url +addressparam;
          if (Config.bDebug)
            console.log("url:" +test  );
           let decodedurl = this.address_search_url +encodeURIComponent(addressparam);
           if (Config.bDebug)
            console.log("decodedurl:" +decodedurl  );
          let response = await axios.get(decodedurl);
          if (Config.bDebug)
          {
            console.log("Routeplan makeGetQuery after axios: addressresponse" );
            console.log(response);
          }
          if (response == null)
            return;
          this.handleResponseData(response, "address", addressparam);

          this.addressresponse = null;
      //    this.setState({ addressresponse: null });
        //  this.setState( { address: targetparam } );
          decodedurl = this.address_search_url +encodeURIComponent(targetparam);
          if (Config.bDebug)
            console.log("decodedurl:" +decodedurl  );
          /*
          await axios.get(decodedurl)
                 .then(response => { this.calladdressresponce(response) } );
          */
         response = await axios.get(decodedurl);
         if (Config.bDebug)
         {
          console.log("Routeplan makeGetQuery after axios: addressresponse" );
          console.log(response);
         }
          if (response == null)
                 return;
          this.handleResponseData(response, "target", targetparam);
        // }

        if (this.addressdata != null && this.addresstargetdata != null)
          this.makeApolloCallForRoutePlan(this.addressdata.addressfeatures, 
                                this.addresstargetdata.addressfeaturestarget); 

     // this.setState({ loading: false });
        /*
       wait(val) {
        thing = thing + 1;
        setTimeout(function() { doSomething(val) }, 500);
        */
      
      }

      /** this mehtod returns json object with founded values:
       * 
       */
      seekRigthAddressFromResponse(response, address)
      {
               if (response == null)
                   return null;
               if (address == null || address.trim().length == 0)
                   return null;

              let i = 0;
              let bSearch = false;
              const features = response.data.features;
              let feature, coordinates, street;
              let bExactAdressFound = false;
              let alladdresses = [];
              let found_address = null;
              let found_feature = null;
              let returneddata = null;
              let addressfeatures = null;
              let searchstops = null;
       
              for (i in features) {
                  feature = features[i];
                  coordinates = feature.geometry.coordinates;
                  street = feature.properties.name;            
                  if (Config.bDebug)
                  {
                      console.log("coordinates:" +coordinates);
                      console.log("street:" +street);
                      console.log("address:" +address);
                  }
                  if (street != null)
                  {
                     alladdresses.push(street);
                  }
                  if (bExactAdressFound)
                      continue;
              
                  if (street != null && street.toString() == address.toString())
                  {
                      bExactAdressFound = true;
                      found_address = street;
                      found_feature = feature; 
                      console.log("bExactAdressFound:" +bExactAdressFound);
                      continue;
                  }
              } 
  
              if (Config.bDebug)
              {
                  console.log("alladdresses });");
                  console.log(alladdresses);
              }
              if (bExactAdressFound)
              {
                  if (Config.bDebug)                
                      console.log("bExactAdressFound2:" +bExactAdressFound);
                  let addressfeature = new Object();
                 if (address.length > 0)
                      bSearch = true;
                  let afeatures = [ found_feature ];
                  searchstops = bSearch;
                  addressfeatures = afeatures;
                  // this.setState( { addressfeatures: afeatures } );
              }
              else
              {
                  if (Config.bDebug)
                      console.log("features for 2:");
                if (address.length > 0)
                      bSearch = true;
                  searchstops = bSearch;
                  addressfeatures = features;             
              }
              //console.log(coordinates);
           //   this.render();

           if (!bExactAdressFound)
           {
            console.log("returning false");
            if (this.state.firstaddress == null)
                this.setState({firstaddress: address});
              else
                this.setState({secondaddress: address});
             return null;
           }

          this.setState({ firstaddressfeatures: addressfeatures});

          returneddata = { found:  bExactAdressFound,
                      addressfeatures: addressfeatures,
                      addressfeaturestarget: null,
                    searchstops: searchstops,
                searchstops: searchstops,
                address: found_address,
                alladdresses: alladdresses
            };
            console.log("returning returneddata");
            // this.setState({"returneddata": returneddata });
           return returneddata;
      }

      removeLastWord = (firstAddress) =>
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
    
    handleResponseData(response, dataname, addressparam)
    {
      if (Config.bDebug)
      {
        console.log("Routeplans handleResponseData");
        console.log("Routeplans dataname");
        console.log(dataname);
        console.log("Routeplans addressparam");
        console.log(addressparam);    
      }
        let firstAddress = addressparam;
        firstAddress = firstAddress.replace(",", "");
        if (Config.bDebug)
            console.log("firstAddress: " +firstAddress);
        var found = this.seekRigthAddressFromResponse(response, firstAddress);        

        // foundedrecorf = this.state.returneddata;
        let earlieraddress = null;
        
        let i = 0;
        let bSearch = false;
        const features = response.data.features;
        let feature, coordinates, street;
        let bExactAdressFound = false;

        while(found == null && firstAddress != null 
              && firstAddress.length > 1 
              && firstAddress.trim() != '')
         {
            if (Config.bDebug)
                 console.log("- while RoutePlans handleResponseData founded: " +found);
            firstAddress = this.removeLastWord(firstAddress);
            if (earlieraddress == firstAddress)
            {
              if (Config.bDebug)
                console.log("- RoutePlans handleResponseData earlieraddress == firstAddress: " +firstAddress);
                break;
            }
            if (Config.bDebug)
              console.log("- RoutePlans handleResponseData firstAddress: " +firstAddress);
            if (firstAddress != null)
            {
               found = this.seekRigthAddressFromResponse(response, firstAddress);               
            }
            earlieraddress = firstAddress;
            if (Config.bDebug)
                console.log("- RoutePlans handleResponseData founded: " +found);
         }
    
         if (found == null)
         {
            console.log("<= RoutePlans handleResponseData founded not founded: ");
            return;
         }

         let alladdresses = found.alladdresses;
         if (Config.bDebug)
         {
          console.log("<= RoutePlans handleResponseData addrs: ");
          console.log(alladdresses);
         }
         if (found.alladdresses != null && found.alladdresses.lengt > 0)
         {
             alladdresses = NearestStops.removeAddressFromArray(found.alladdresses, found.address);
             console.log(alladdresses);
         }

         /*
            returneddata = { found:  bExactAdressFound,
                      addressfeatures: addressfeatures,
                    searchstops: searchstops,
                searchstops: searchstops,
                address: found_address,
                alladdresses: alladdresses
            };
            */
   
            /*
         this.setState({ alladdresses: alladdresses, address: found.address, 
             searchstops: found.searchstops,
             addressfeatures: found.addressfeatures });
             */
         if (Config.bDebug)
         {
            console.log("RoutePlans handleResponseData founded");
            console.log(found.found);
         }

         if (found.found)
         {
            if (Config.bDebug)
               console.log("bExactAdressFound2:" +found.found);
             let addressfeature = new Object();
             if (addressparam.length > 0)
                 bSearch = false;
             let afeatures = [ feature ];
             if (dataname == "address")
             {
                this.addressdata = found;
                return;
             }
             else
             if (dataname == "target")
             {
                this.setState({ secondaddressfeatures: found.addressfeatures});
                found.addressfeaturestarget = found.addressfeatures;
                this.addresstargetdata = found;     
                return;
             }


             /*
             if (dataname == "address")
             {
                console.log("set address");
                console.log("afeatures:" +afeatures.toString());
                console.log("this.state.this.addressfeaturestarget:" +found.addressfeatures);
                this.setState({ searchstops: bSearch });
                this.setState( { addressfeatures: afeatures } );   
                if (found.addressfeaturestarget != null && afeatures != null)
                    this.makeApolloCallForRoutePlan(afeatures, found.addressfeaturestarget); 
             }
             else
             if (dataname == "target")
             {
                console.log("set target");
                console.log("afeatures:" +afeatures.toString());
                console.log("this.state.this.addressfeatures:" +found.addressfeatures);
                this.setState({ searchstops: bSearch });
                this.setState( { addressfeaturestarget: found.addressfeatures } );   
                if (found.addressfeatures != null && afeatures != null)
                   this.makeApolloCallForRoutePlan(found.addressfeatures, 
                        afeatures);
             }
             */
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
                if (found.address.toString().length > 0)
                    bSearch = true;
              //  this.setState({ searchstops: bSearch });
         }
    }

    makeApolloCallForRoutePlan = (addressfeatures, addressfeaturestarget) =>
    {
      if (Config.bDebug)
      {
        console.log("makeApolloCallForNearestStops" );
        console.log("addressfeatures" );
        console.log(addressfeatures );
        console.log("addressfeaturestarget" );
        console.log(addressfeaturestarget );
      }
        let coordinates = null;
        let coordinatestarget = null;
        
        coordinates = addressfeatures.map((feature) => { return (feature && feature.geometry && feature.geometry.coordinates ? feature.geometry.coordinates : null); });
        coordinatestarget = addressfeaturestarget.map((feature) => { return (feature && feature.geometry && feature.geometry.coordinates ? feature.geometry.coordinates : null); });
        if (Config.bDebug)
        {
          console.log("coordinates" );
          console.log(coordinates );
          console.log("coordinatestarget" );
          console.log(coordinatestarget );
        }
        let longitude = coordinates[0][0];
        let latitude = coordinates[0][1];
        let longitudetarget = coordinatestarget[0][0];
        let latitudetarget = coordinatestarget[0][1];
        this.makeApolloCallForRoutePlanAfterLongitudeAndLatitue(longitude, latitude, 
          longitudetarget, latitudetarget);
    }

    makeApolloCallForRoutePlanAfterLongitudeAndLatitue = (longitude, latitude, longitudetarget, latitudetarget) =>
    {
      if (Config.bDebug)
      {
        console.log("makeApolloCallForRoutePlanAfterLongitudeAndLatitue");
        console.log("longitude ");
        console.log(longitude );
        console.log("latitude ");
        console.log(latitude );
        console.log("longitudetarget ");
        console.log(longitudetarget);
        console.log("latitudetarget ");
        console.log(latitudetarget);
      }
        this.setState({seeKAllStopTimes: false});

        // stopsByRadius(lat:60.199,lon:24.938,radius:500) {

  const options = {
    method: 'POST',
    data: `{
      stopsByRadius(lat:{latitude},lon:{longitude},radius:500) {
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
  
   //     from: {lat: 60.168992, lon: 24.932366}
   // to: {lat: 60.175294, lon: 24.684855}

  // from: {lat: ` +latitude +`, lon: ` +longitude +`}
  // to: {lat: ` +latitudetarget +`, lon: ` +longitudetarget +`},


	// maxResults: 10,
  let body = `{ plan(
    from: {lat: ` +latitude +`, lon: ` +longitude +`}
    to: {lat: ` +latitudetarget +`, lon: ` +longitudetarget +`},
   numItineraries: 100
   ) {
    itineraries {
      legs {
        route {
          gtfsId
          
          longName
          shortName
        }
        startTime
        endTime
        departureDelay
        arrivalDelay
        mode
        duration
        realTime
        distance
        transitLeg
        serviceDate
      	intermediateStops {
      	  id
          gtfsId
          name
          desc
          direction
          vehicleType
      	}
        intermediatePlaces {
          name
          lat
          lon
          departureTime
          arrivalTime          
        }
      }
    }
  }
}
}`;

  if (Config.bDebug)
  {
    console.log("body");
    console.log(body);
  }
  this.setState({showShowAllLegs: false, disableCancelButton: false });

   fetch( this.hsl_baseurl +'routing/v1/routers/' +NearestStops.localHSLUri +'/index/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/graphql",  'Accept': '*/*'},
    signal: this.abortSignal,
    body: body
     })
    .then(response => { return response.json();})
    .then(responseData => { if (Config.bDebug)
      console.log(responseData.data); return responseData.data;})
    .then(data => { 
      if (Config.bDebug)
      {
        console.log("data");
        console.log(data);
        console.log(data.plan.itineraries);
        console.log("this.state.firstaddress before null!");
      }

      let first = this.state.firstaddress
      let second = this.state.secondaddress
      if (data != null && data.plan != null && data.plan.itineraries != null
        && data.plan.itineraries.lengt > 0)
      {
        console.log("first second null!");
        console.log(data);
        first = null
        second = null
      }
      
      let plans = data.plan.itineraries
      // console.log("returned plans");
      // console.log(plans);
      if (plans === undefined || plans.length == 0)
      {
        plans = null;
        // console.log("plans = null!");
      }

      this.setState({ uncheckCheckBox: true, plans: plans,
        loading: false, disableCancelButton: true, firstaddress: first,
        secondaddress: second }) }
      )
    .catch((error) => {
        console.error("error");
        console.error(error);
        this.setState({ loading: false, plans: null, loading: false, disableCancelButton: true });
    });

        if (Config.bDebug)
           console.log("makeApolloCallForNearestStops 3" );
    }

    handleChecboxShowAllLegs = (id, label, isChecked) =>
    {
      if (Config.bDebug)
      {
        console.log("handleChecboxShowAllLegs");
        console.log("id");
        console.log(id);
        console.log("label");
        console.log(label);
        console.log("isChecked");
        console.log(isChecked);
      }

      if (isChecked && this.addressdata != null && this.addresstargetdata != null ) 
      {
          this.setState({showShowAllLegs: true});
      }
      else
      if (!isChecked && this.addressdata != null && this.addresstargetdata != null ) 
      {
          this.setState({showShowAllLegs: false});
      }
    }

    routeAddressesSelected = () => {
      if (Config.bDebug)
        console.log("abortController.abort()");
      if (this.state.loading && !this.abortController.aborted)
      {
          this.abortController.abort();
          this.setState({ loading: false});
      }
    }

    getMissingBusStops(loadingComp, loading, plans, bButtonPressed, missingaddress, missingtarget)
    {      
      if (Config.bDebug)
      {
        console.log("xxx getMissingBusStops loading=" +loading);
        console.log("xxx getMissingBusStops plans=" +plans);
        console.log("xxx getMissingBusStops bButtonPressed=" +bButtonPressed);      

      if (plans != null)
        console.log("xxx getMissingBusStops plans=" +plans.lenth);
      if (loadingComp == null)
      {
        console.log(">null> getMissingBusStops");
        console.log("missingaddress" +missingaddress);
        console.log("missingtarget" +missingtarget);
      }
      else
      {
        console.log("--- getMissingBusStops");
        console.log("missingaddress" +missingaddress);
        console.log("missingtarget" +missingtarget);
      }
      }
      return loadingComp;
    }

    render(props, state) {
      if (Config.bDebug)
      {
        console.log("render");
        console.log("state");
        console.log(state);
      }
        let loading = this.state.loading;
        let loadingComp = null;
        let features2 = null;
        let plans = this.state.plans;
        if (state.bButtonPressed && (!loading && plans != null))
          loadingComp = <h4 aria-label="Tulokset alla">Tulokset alla.</h4>;
        else
        if (state.bButtonPressed && (loading && plans == null))
           loadingComp = <h4 aria-label="Ladataan">Ladataan...</h4>;
        else
        if (state.bButtonPressed && (!loading && plans == null))
          loadingComp = <h4 tabIndex="0" aria-label="Ei tuloksia">Ei tuloksia.</h4>;
        
        if (Config.bDebug)
          console.log(plans);
        let planitems = null;
        let i = 0;
        let features3 = null;
          loadingComp = this.getMissingBusStops(loadingComp, loading, plans,
            state.bButtonPressed, this.state.firstaddress, 
            this.state.secondaddress);
        if (plans != null && plans.length > 0) 
        {
            if (Config.bDebug)
              console.log(plans.length);
            planitems = plans.map((plan, ind) => { 
              return <RoutePlan id={"routeplan" +ind} 
                      index={ind} plan={plan} 
                      showShowAllLegs={state.showShowAllLegs} /> } );
            features2 = <div role="navigation" aria-label="tulosten osoitteet">
                    <h4 tabIndex="0"><b>{this.state.firstaddress}<space> </space>
                   (pit {this.state.firstaddressfeatures[0].geometry.coordinates[1]}<space> </space> 
                   lev {this.state.firstaddressfeatures[0].geometry.coordinates[0]})
                   </b></h4><h4 tabIndex="0"><b>{this.state.secondaddress}<space> </space> 
                   (pit {this.state.secondaddressfeatures[0].geometry.coordinates[1]}<space> </space>  
                   lev {this.state.secondaddressfeatures[0].geometry.coordinates[0]})
                   </b></h4><p/></div>;
            features3 = <Checkbox id="idChecboxShowAllLegs" 
            label="Avaa kaikki reittivaihtoehtojen alakohdat" 
            handleCheckboxChange={this.handleChecboxShowAllLegs} 
            isChecked={state.uncheckCheckBox == true ? false : state.showShowAllLegs} 
            />;
        }

        return (
            <section data-message="Reittisuunnitelma">              
             <h1 tabIndex="0">Reittisuunnitelma lähtö- ja tulo-osoitteiden mukaan</h1>
             <div onChange={props.selectedDataSource} 
	 data-message="Tietoja luetaan järjestelmästä valinta">
	   <fieldset>
		 <legend>Mistä tietoja haetaan:</legend>
		   <div>
		   <input type="radio" id="hsl" value="HSL" checked={true} 
		  name="datasource" /><label for="hsl">HSL</label>
		 <input type="radio" id="finland" value="FINLAND" 
		 name="datasource" /><label for="finland">FINLAND</label>
		 <input type="radio" id="waltti" value="WALTTI" 
		 name="datasource" /><label for="waltti">WALTTI</label>
		 </div>
	   </fieldset>
	 </div>
             <GiveAddresses  addresssesselected={this.addresssesSelected}
               address={this.state.address} target={this.state.target}
               routeAddressesSelected={this.routeAddressesSelected}
               disableCancelButton={this.state.disableCancelButton}/> 
             <div>
             {features2}
             {features3}
             <p/>
             <div id="loadingComp2" aria-live="polite">{loadingComp}</div>
             <div role="navigation" aria-label="kyselyn tulokset">
              <ul style={style.ul}>
             {planitems}
             </ul>
             </div>
             </div>
            </section>
        );
    }
  }

export default RoutePlans;
