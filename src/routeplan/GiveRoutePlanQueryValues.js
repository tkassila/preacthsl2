import React, {h, Component, createRef } from 'preact';
import Config from '../util/Config';
// import Button from 'preact-material-components/Button';

/**
 * This class are given user input for start and end address for bus route server
 * query.
 */
class GiveRoutePlanQueryValues extends Component 
{
    addressfield = createRef();
    targetaddressfield  = createRef();

    constructor(props) {
        super(props);
        this.state = {
      //      chkbox: false
            inputValue: '',
        inputTarget: '',
        errormsg: null
        }
        this.updateInput = this.updateInput.bind(this);
        this.updateTarget = this.updateTarget.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.focusTarget = this.focusTarget.bind(this);
        this.searchroutes = this.searchroutes.bind(this);
    }

    componentDidMount(){
        //        this.addressfield.focus()
       this.addressfield.current.focus();
    }

    updateInput(event){
        if (Config.bDebug)
        console.log("updateInput: " +event.target.value);
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errormsg: null});
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

    updateTarget(event){
        if (Config.bDebug)
        console.log("updateTarget: " +event.target.value);
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errormsg: null});
        this.setState({inputTarget : value})
    }

    focusTarget(event){
        if (Config.bDebug)
        console.log("focusTarget: " +event.target.value);
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errormsg: null});
        this.setState({inputTarget : value})
    }

    clearTimeout(timer)
    {
        this.timer = null;
    }

    searchroutes() {
        if (Config.bDebug)
        console.log(this.state);
        let target = this.state.inputTarget;
        let inputvalue = this.state.inputValue;
        
        if (inputvalue == null || inputvalue.toString().trim() == '')
        {
            this.setState({errormsg: this.getErrorMsg("Lähtöoosoite puuttuu tai on tyhjä")});
            this.timer = setTimeout(() => {
                this.addressfield.current.focus();
                this.clearTimeout(this.timer);
            }, 4000);        
            return;         
        }
        if (target == null ||target.toString().trim() == '')
        {
            this.setState({errormsg: this.getErrorMsg("Määränpääsoite puuttuu tai on tyhjä")});
            this.timer = setTimeout(() => {
                this.targetaddressfield.current.focus();
                this.clearTimeout(this.timer);
            }, 4000);        
            return;         
        }

        if (inputvalue != null && inputvalue != '' &&
            target != null && target != '')
                this.props.addresssesselected(inputvalue, target);
    }

    isNumeric(val) {
        return Number(parseFloat(val)) === val;
    }

    routeAddressesSelected = () => {
        this.props.routeAddressesSelected();
    }

    getErrorMsg(msg)
    {
        if (msg == null || msg == '')
            return null;
        let ret = <div className="error"><space> </space><h3>Virhe: {msg}</h3></div>;
        return ret;
    }

     //  <label htmlFor="address">Anna osoite:</label><br/>
             
    render(props, state) {
        return (
            <div data-message="reittiehdotuksen osoitteet">
            <h3>Osoitteet ehdotettavile reiteille:</h3>
                <label htmlFor="sourceaddress">Anna lähtöosoite (paikkakunta viimeisenä, isoalkukirjain):</label><br/>
                <input type="text" id="sourceaddress" name="sourceaddress" placeholder="Kirjoita lähtöosoite.." 
                    maxlength="100" size="70" onChange={this.updateInput} 
                    onFocue={this.focusInput} 
                    defaultValue={this.state.inputValue || ''}
                    ref={this.addressfield} /><br/><br/>
                <label htmlFor="targetaddress">Anna määränpääosoite (paikkakunta viimeisenä, isoalkukirjain):</label><br/>
                <input type="text" id="targetaddress" name="targetaddress" placeholder="Kirjoita määränpääosoite.." 
                    maxlength="100" size="70" onChange={this.updateTarget} 
                    onFocue={this.focusTarget} 
                    defaultValue={this.state.inputTarget || ''}
                    ref={this.targetaddressfield}/>
                    {state.errormsg != null ? <div tabIndex="0" id="errorfield1" aria-live="polite">{state.errormsg}</div>: null}<br/>
                    <br/>
                <button onClick={this.searchroutes} aria-label="Hae reittejä">
                    
                    Hae reittejä
                    
                </button>
                &nbsp;&nbsp;
                <button disabled={props.disableCancelButton} aria-label="Keskeytä haku"
                onClick={this.routeAddressesSelected} >
                    
                    Keskeytä haku
                    
                </button>
                <p/>
             </div>
        );
    }
}

export default GiveRoutePlanQueryValues;
