import React, { Component, h, createRef }  from 'preact';
// import Button from 'preact-material-components/Button';
import Config from '../util/Config';

class GiveAddress extends Component 
{
    addressfield = createRef();;
 
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
                addresses: null
            }
        this.updateInput = this.updateInput.bind(this);
        this.focusInput = this.updateInput.bind(this);
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
        this.setState({inputValue : event.target.value})
    }
    
    updateDistance(event){ // event.target.valueAsInteger || event.target.value
        this.setState({inputDistance :  event.target.valueAsInteger || event.target.value})
    }

    isNormalInteger(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }

    getErrorDistance(msg)
    {
        if (msg == null || msg == '')
            return null;
        let ret = <div className="error"><space> </space><h3>{msg}</h3></div>;
        return ret;
    }

    searchaddressss() {
        if (Config.bDebug)
            console.log("searchaddressss()");
        if (Config.bDebug)
            console.log(this.state);
    let distance = this.state.inputDistance;
	if (distance == '')
        distance = '800';
    else
    {
        this.setState({ errordistance: null });
        let isnan = isNaN(distance);
        if (isnan)
        {
            console.log("isnan");
            this.setState({errordistance: this.getErrorDistance("Ei ole numero")});
            return;
        }        
        if (!this.isNormalInteger(distance))
        {
            console.log("!isNormalInteger(distance)");
            return;
        }
        let isgreaterthanzero = parseInt(distance) > 0;
        if (Config.bDebug)
            console.log("isgreaterthanzero" +isgreaterthanzero);
        if (!isgreaterthanzero)
        {
            console.log("!isgreaterthanzero(distance)");
            return;
        }
    }
    let inputvalue = this.state.inputValue;   
    // get rigth input control value, if state inputvlaue has a wrong
    // search address value. That's clicked elseware earlier:
    let inputvaluefieldvalue = this.addressfield.current.value;
    if (inputvaluefieldvalue != null && inputvalue != null 
        && inputvaluefieldvalue !== inputvalue)
        inputvalue = inputvaluefieldvalue;
	if (inputvalue != null && inputvalue != '' &&
	    distance != null && distance != '')
            this.props.addresssselected(inputvalue, distance);
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

     //  <label htmlFor="address">Anna osoite:</label><br/>
             
    render(props, state) { // placeholder="Anna pysäkkien maksimi etäisyys.." 
        let errordistance = state.errordistance; 
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
                <label htmlFor="distance">Anna pysäkkien maksimi etäisyys metreissä:</label><br/>
                <input type="text" id="distance" name="distance"                     
                    maxlength="70" size="70" onChange={this.updateDistance} 
                    defaultValue={this.state.inputDistance}/>{errordistance}
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

export default GiveAddress;
