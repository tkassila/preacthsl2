import React, { Fragment, Component } from 'preact';
import Address from './Address.js'
import {h } from 'preact';
import Config from '../util/Config';

/**
 * This class component is showing a list of addresses.
 */
class AddressList extends Component 
{
    constructor(props) {
        super(props);
        if (Config.bDebug)
        {
            console.log("AddressList constructor(props)");
            console.log(props);
        }
        this.state = {
            chkbox: false,
            addresses: props.alladdresses,
	    distance: null
        }
        if (Config.bDebug)
        {
            console.log("this.state");
            console.log(this.state);
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
       
        return true;
    }

    componentWillReceiveProps(nextProps) 
    {  
        this.setState({ address: nextProps.address, addresses: nextProps.alladdresses,
            distance:  nextProps.distance });    
      return true;   
    }

    handleChangeChk = () => {
        this.setState({
            chkbox: !this.state.chkbox
        });
        if (Config.bDebug)
            console.log(this.state);
     //   React.render(this, document.getElementById('div.ListAddresses'));
      }

    render(props, state) {
        if (Config.bDebug)
        {
            console.log("AddressList::render(props, state)");
            console.log("props");
            console.log(props);
            console.log("state");
            console.log(state);
            console.log("props.alladdresses");
            console.log(props.alladdresses);
        }
        
        const hidden = !state.chkbox;
        let addresses = null;
        if (props.alladdresses != null)
          addresses = props.alladdresses.map((child, i) => {
                return <Address id={i} addresssselected={this.props.addresssselected} 
                address={child} distance={this.props.distance} /> });
        if (Config.bDebug)
        {
            console.log("alladdresses");
            console.log(props.alladdresses);
            console.log("addresses");
            console.log(addresses);
            console.log("hidden");
            console.log(hidden);
        }
        if (state.chkbox)
        {
            return (
                <Fragment>
                    <h3 tabIndex="0">Annetun osoitteen muita löytyneitä osoitteita</h3>
                    <input tabIndex="0" type="checkbox" id="checkbox_id" name="checkbox_id" 
                    aria-label="Näytä osoitelista" 
                    defaultChecked={this.state.chkbox} 
                    onChange={this.handleChangeChk} />
                    <label htmlFor="checkbox_id" >Näytä osoitelista</label>
                    <div className={!state.chkbox ? 'hidden' : ''}>
                     {addresses}                    
                    </div>           
               </Fragment>
            );    
        }
        else
            return (
            <Fragment>
                <h3 tabIndex="0">Annetun osoitteen muita löytyneitä osoitteita</h3>
                <input tabIndex="0" type="checkbox" id="checkbox_id" name="checkbox_id"
                defaultChecked={this.state.chkbox} 
                onChange={this.handleChangeChk} />
                <label htmlFor="checkbox_id">Näytä osoitelista</label>            
            </Fragment>
            );
    }
}

export default AddressList;
