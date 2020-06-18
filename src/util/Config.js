import { Component } from 'preact';
import NearestStops from '../neareststops/NearestStops';

class Config extends Component {

    /**
     * if true then GiveNearStopQueryValues class contais a test button to
     * test startime user input by hardcode way. That is near stop ui and query.
     */
    static bTestButton = false;

    static bDebug = true
    ;
    static bUseOwnGatewayServer = false;
    static CORS_DIGITRANSITSERVER = 'https://api.digitransit.fi/';
    // https://api.digitransit.fi/hsl/index/graphql

    static HSL_SERVER_URL = "https://reittiopas.hsl.fi";

    static FINLAN_SERVER_URL = "https://opas.matka.fi";

    /*
    static HSLLSERVICEURI = {
      HSL: 'hsl',
      WALTTI: 'waltti',
      FINLAND: 'finland'
    };
    */
   static HSLLSERVICEURI_HSL = 'hsl';
   static HSLLSERVICEURI_WALTTI = 'waltti';
   static HSLLSERVICEURI_FINLAND = 'finland';

   /* hsl_baseurl is a localhost url and post into proxy local server
     which interprets request into real (hsl) server. Which data then 
    returned from proxy, gateway server into a user broser.
    The below address must be have uri at end: .../hsl/ that gateway server
    makes requst and ansver back:
    */
  
   static HSL_LOCAL_PORT = ":8080";
   static HSL_LOCAL_WEBADDRESS = "http://localhost";
   static HSL_LOCAL_WEBURI_END = "/hsl/";
   static hsl_baseurl = null;

    constructor(props)
    {
      super(props);
      this.state = {          

      }
      let basewebaddress = NearestStops.getHslBaseUrl();
      if (basewebaddress == null)
      {
        console.log("Config.js: NearestStops.getHslBaseUrl() is null!")
        this.hsl_baseurl = Config.HSL_LOCAL_WEBADDRESS +Config.HSL_LOCAL_PORT +Config.HSL_LOCAL_WEBURI_END;
      }
      else
        this.hsl_baseurl = basewebaddress; 
    }

    render() {
      return (
        <div>
        </div>  
      );} 
  }

  export default Config;