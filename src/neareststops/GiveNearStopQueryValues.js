import React, { Component, h, createRef }  from 'preact';
// import Button from 'preact-material-components/Button';
import Config from '../util/Config';
import StaticFunctions from '../util/StaticFunctions';

/**
 * This class is given address and distance inputs from user before near (bus) stops.
 */
class GiveNearStopQueryValues extends Component 
{
    addressfield = createRef();
    distanceRef = createRef();
    starttimefield = createRef();
    timer = null;
 
    constructor(props) {
        super(props);
        let localAddress = (props.address != null ? props.address : '');
        let localDistance = (props.distance != null ? props.distance : '');
        if (localDistance == null || localDistance == '')
            localDistance = '800';
        this.state = {
      //      chkbox: false
                inputValue: localAddress,
                inputDistance: localDistance,
                errordistance: null,
                addresscoordinateswrong: false,
                stopstarttime: null,
                addresses: null
            }
        this.distanceRef = React.createRef()
        // this.addressRef = React.createRef()

        this.updateInput = this.updateInput.bind(this);
        this.focusInput = this.updateInput.bind(this);
        this.focusStarttime = this.focusStarttime.bind(this);     
        this.updateStarttime = this.updateStarttime.bind(this);                
        this.updateDistance = this.updateDistance.bind(this);
        this.searchaddressss = this.searchaddressss.bind(this);
        this.stopAddresssSelected = this.stopAddresssSelected.bind(this);
    }

    componentDidMount(){
//        this.addressfield.focus()
        this.addressfield.current.focus();
     }
     
     
     /*
     componentDidUpdate(){
        //        this.addressfield.focus()
          //  if (this.state.)
            //    this.divFocus.current.focus();
     }
     */

    componentWillReceiveProps(nextProps) 
    {
        let localAddress = (nextProps.address != null ? nextProps.address : '');
        let localDistance = (nextProps.distance != null ? nextProps.distance : '');
        if (localDistance == null || localDistance == '')
            localDistance = '800';

       if (Config.bDebug)
            console.log("componentWillReceiveProps");
       if (Config.bDebug)
            console.log("this.state");
       if (Config.bDebug)
            console.log(this.state);
       if (Config.bDebug)
            console.log("nextProps");
       if (Config.bDebug)
            console.log(nextProps);

        if (nextProps.addresscoordinateswrong )
        {
            this.setState({errordistance: this.getErrorMsg("Osoite tuntematon. Ei leveys ja pituusosoitekoordinaatteja haun jälkeen.")});
            /*
            this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.addressfield.current.focus();
                    clearTimeout(this.timer);
             }, 4000); 
             */
        }

        this.setState({
      //      chkbox: false
            inputValue: localAddress,
            inputDistance: localDistance,
            address: nextProps.address,
            addresses: nextProps.alladdresses
        });
        return true;   
    }

    updateInput(event){
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errordistance: null});
        this.setState({inputValue : value})
    }
    
    focusInput(event){
        if (Config.bDebug)
        console.log("focusInput: " +event.target.value);
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errormsg: null});
        this.setState({inputValue : value})
    }

    updateDistance(event){ // event.target.valueAsInteger || event.target.value
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errordistance: null});
        this.setState({inputDistance :  event.target.valueAsInteger || event.target.value})
    }

    isNormalInteger(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }

    getErrorMsg(msg)
    {
        if (msg == null || msg == '')
            return null;
        let ret = <div className="error"><space> </space><h3>Virhe: {msg}</h3></div>;
        return ret;
    }

    clearTimeout(timer)
    {
        this.timer = null;
    }

    getStartTimeErrorMsg(message)
    {
        if (Config.bDebug)
        {
            console.log("getStartTimeErrorMsg: " +message);
        }

        if (message == null || message.trim().length == 0)
            return "";
        let starUserMsg = "Korjaa: ";
        let endUserMsg = " Anna lähtöaika muodossa: tunti:min ";
        switch(message)
        {
            case "error_time_unknowvalue":
                return starUserMsg +" tuntematon aika virhe. " +endUserMsg;
                break;
            case "error_month_datelength_withseparator":
                return starUserMsg +" pvm kuukausi virhe. " +endUserMsg;
                break;
            case "error_month_datelength_withseparator":
                return starUserMsg +" päivä virhe. " +endUserMsg;
                break;
            case "error_month_unknowvalue":
                return starUserMsg +" pvm kuukaisi virhe. " +endUserMsg;
                break;
            case "error_date_unknowvalue":
                return starUserMsg +" päivä virhe. " +endUserMsg;
                break;
            default:
                console.log("getStartTimeErrorMsg unknow err msg: " +message);
                return starUserMsg +" tuntematon virhe. " +endUserMsg;
                break;
        }
    }

    searchaddressss() {
        if (Config.bDebug)
            console.log("searchaddressss()");
        if (Config.bDebug)
            console.log(this.state);

        this.setState({errordistance: this.getErrorMsg("")});
        let inputvaluefieldvalue = this.addressfield.current.value;

        if (inputvaluefieldvalue == null ||
            inputvaluefieldvalue.toString().trim() == '' )
        {
            this.setState({errordistance: this.getErrorMsg("Osoite puuttuu tai on tyhjä")});
            this.timer = setTimeout(() => {
                console.log('Timeout called!');
                this.addressfield.current.focus();
                this.clearTimeout(this.timer);
            }, 4000);        
            return;
        }

        let distance = this.state.inputDistance;
        if (distance == '')
            distance = '800';
        else
        {
            let isnan = isNaN(distance);
            if (isnan)
            {
                if (Config.bDebug)
                    console.log("isnan");
                this.setState({errordistance: this.getErrorMsg("Pysäkkien etäisyys ei ole numero")});
                this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.distanceRef.current.focus();
                    this.clearTimeoutclearTimeout(this.timer);
                }, 4000);                        
                return;
            }        
            if (!this.isNormalInteger(distance))
            {
                console.log("!isNormalInteger(distance)");
                this.setState({errordistance: this.getErrorMsg("Pysäkkien etäisyys ei ole kokonaisluku")});
                this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.distanceRef.current.focus();
                    this.clearTimeout(this.timer);
                }, 4000);                        
                return;
            }
            let isgreaterthanzero = parseInt(distance) > 0;
            if (Config.bDebug)
                console.log("isgreaterthanzero" +isgreaterthanzero);
            if (!isgreaterthanzero)
            {
                if (Config.bDebug)
                    console.log("!isgreaterthanzero(distance)");
                this.setState({errordistance: this.getErrorMsg("Pysäkkien etäisyys: luvun oltava nollaa suurempi")});
                this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.distanceRef.current.focus();
                    this.clearTimeout(this.timer);
                }, 4000);                        
                return;
            }
        }

        // check that user given time or date time value is ok:

        let stopstarttime = this.state.stopstarttime;
        if (stopstarttime != null)
        {
            stopstarttime = stopstarttime.trim();
            if (stopstarttime.length == 0)
                stopstarttime = null;
            else
            if (stopstarttime.length != 0) // check stopstarttime that is valid
            {
                if (Config.bDebug)
                console.log("GiveNearStopQueryValues stoptimedate " +stopstarttime);
                try 
                {
                    let format = StaticFunctions.getMomentFormat(stopstarttime);
                    if (Config.bDebug)
                        console.log("GiveNearStopQueryValues format" +format);

                    let timeDate = StaticFunctions.getTodayDateFromTime(stopstarttime, format);
                    if (timeDate != null)
                    {
                        if (Config.bDebug)
                            console.log("GiveNearStopQueryValues StaticFunctions.getUnixSecondsFromDate()");
                        let sedonds = StaticFunctions.getUnixSecondsFromDate(timeDate);
                        if (Config.bDebug)
                            console.log("GiveNearStopQueryValues sedonds" +sedonds);                
                    } 
                }
                catch(err) {        
                // document.getElementById("demo").innerHTML = err.message;
                console.log("GiveNearStopQueryValues::getNearestStopStartTime - error starttime=" +stopstarttime);
                console.log("GiveNearStopQueryValues::getNearestStopStartTime - error starttime=" +err);
                console.log("GiveNearStopQueryValues::getNearestStopStartTime - not using this value!");
                this.setState({errordistance: this.getErrorMsg("Lähtöaika virhe: " +this.getStartTimeErrorMsg(err))});
                this.timer = setTimeout(() => {
                    console.log('starttimefield called!');
                    this.starttimefield.current.focus();
                    this.clearTimeout(this.timer);
                    }, 4000);                        
                return;
                }
            }
        } 

        let inputvalue = this.state.inputValue;   
        // get rigth input control value, if state inputvlaue has a wrong
        // search address value. That's clicked elseware earlier:
        if (inputvaluefieldvalue != null && inputvalue != null 
            && inputvaluefieldvalue !== inputvalue)
            inputvalue = inputvaluefieldvalue;
        if (inputvalue != null && inputvalue != '' &&
            distance != null && distance != '')
                this.props.addresssselected(inputvalue, distance, stopstarttime);
    }

    stopAddresssSelected() {
        this.props.stopAddresssSelected();
    }

    isNumeric(val) {
       // return Number(parseFloat(val)) === val;
       let isnan = isNaN(val);
       if (Config.bDebug)
           console.log("isnan" +isnan);
       let isinteger = Number.isInteger(parseInt(val));
       if (Config.bDebug)
           console.log("isinteger" +isinteger);
        let isFloat = parseFloat(val) > 0;
           if (Config.bDebug)
               console.log("isFloat" +isFloat);               
       let isgreaterthanzero = parseInt(val) > 0;
       if (Config.bDebug)
           console.log("isgreaterthanzero" +isgreaterthanzero);
       let ret = !isnan && !isFloat && isinteger && isgreaterthanzero;
       if (Config.bDebug)
           console.log("ret" +ret);
       return ret;        
    }

    updateStarttime(event){
        let value = event.target.value;
        if (value === undefined)
            return;
        this.setState({ errordistance: null, stopstarttime: value})
    }
    
    focusStarttime(event){
        if (Config.bDebug)
            console.log("focusStartTime: " +event.target.value);
        let value = event.target.value;
        if (value == undefined)
            return;
        // if (value != null && value.trim() != "")
           // this.setState({errormsg: null});
        this.setState({ stopstarttime: value });
    }

     //  <label htmlFor="address">Anna osoite:</label><br/>
             
    render(props, state) { // placeholder="Anna pysäkkien maksimi etäisyys.." 
        if (Config.bDebug)
            console.log("errordistance" +state.errordistance);
        return (             
            <div data-message="Anna haettavien pysäkkien lähiosoite">
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

            <h3>Lähisoite pysäkeille:</h3>
                <label htmlFor="address">Anna lähin osoite lähellä sijaitseville pysäkeille (paikkakunta viimeisenä, isoalkukirjain):</label><br/>
                <input type="text" id="address" name="address" placeholder="Kirjoita haettava osoite.." 
                    maxlength="200" size="70" onChange={this.updateInput}
                    onFocus={this.focusInput} 
                    defaultValue={this.state.inputValue || ''}
                    ref={this.addressfield} /><br/><br/>
                <label htmlFor="startime">Anna kelloaika lähtöajalle (tunti tai tunti:minuutteja):</label><br/>
                <input type="text" id="starttime" name="starttime" placeholder="Kirjoita lähtöaika tai jätä tyhjäksi.." 
                    maxlength="20" size="70" onChange={this.updateStarttime}
                    onFocus={this.focusStarttime} 
                    defaultValue={this.state.starttime || ''}
                    ref={this.starttimefield} /><br/><br/>
                <label htmlFor="distance">Anna pysäkkien maksimi etäisyys metreissä:</label><br/>
                <input type="text" id="distance" name="distance"                     
                    maxlength="70" size="70" onChange={this.updateDistance} 
                    defaultValue={this.state.inputDistance}
                    ref={this.distanceRef}/>
                    <div id="errordistance1" aria-live="polite">{state.errordistance}</div>
                    <br/><br/>
                <button onClick={this.searchaddressss} aria-label="Hae pysäkkejä" >

                    Hae pysäkkejä

                </button>
                &nbsp;&nbsp;
                <button role="button" disabled={props.disableCancelButton} 
                aria-label="Keskeytä haku"
                onClick={this.stopAddresssSelected} >
                    
                    Keskeytä haku
                    
                </button>
             </div>
        );
    }
}

export default GiveNearStopQueryValues;
