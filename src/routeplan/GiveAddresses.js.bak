import {h, Component, createRef } from 'preact';
import Config from '../util/Config';
// import Button from 'preact-material-components/Button';

class GiveAddresses extends Component 
{
    addressfield = createRef();

    constructor(props) {
        super(props);
        this.state = {
      //      chkbox: false
            inputValue: '',
	    inputTarget: ''
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
        this.setState({inputValue : event.target.value})
    }

    focusInput(event){
        if (Config.bDebug)
        console.log("focusInput: " +event.target.value);
        this.setState({inputValue : event.target.value})
    }

    updateTarget(event){
        if (Config.bDebug)
        console.log("updateTarget: " +event.target.value);
        this.setState({inputTarget : event.target.value})
    }

    focusTarget(event){
        if (Config.bDebug)
        console.log("focusTarget: " +event.target.value);
        this.setState({inputTarget : event.target.value})
    }

    searchroutes() {
        if (Config.bDebug)
        console.log(this.state);
	let target = this.state.inputTarget;
	if (target == '')
	    return ;
	let inputvalue = this.state.inputValue;
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

     //  <label htmlFor="address">Anna osoite:</label><br/>
             
    render(props) {
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
                    defaultValue={this.state.inputTarget || ''}/><br/>
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

export default GiveAddresses;
