import { Component } from 'preact';

class Config extends Component {

    static bDebug = true;

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
      this.hsl_baseurl = Config.HSL_LOCAL_WEBADDRESS +Config.HSL_LOCAL_PORT +Config.HSL_LOCAL_WEBURI_END;
    }
  
    render() {
      return (
        <div>
        </div>  
      );} 
  }

  export default Config;