import React, { Fragment } from 'preact';
import { useState  } from 'preact/hooks';
// const { useState, useEffect, useMemo } = React;
import { useContext } from 'preact/compat';
import Address from './Address.js'
import {h } from 'preact';
import Config from '../util/Config';
import CssDark from '../context/Context';
import Checkbox from '../components/Checkbox.js';

/**
 * This function component is showing a list of addresses.
 */
//class AddressList extends Component 
const AddressList = (props) =>
{
    // const [chkbox, setChkbox] = useState(0);
    const [chkbox, setChkbox] = useState(false);

    /*
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
    */

    const handleChangeChk = () => {
        setChkbox(!chkbox);
        /*
        this.setState({
            chkbox: !this.state.chkbox
        });
        if (Config.bDebug)
            console.log(this.state);
        */
     //   React.render(this, document.getElementById('div.ListAddresses'));
      }

 //   render(props /*, state */) {
        const cssDark = useContext(CssDark);

        if (Config.bDebug)
        {
            console.log("AddressList::render(props, state)");
            console.log("props");
            console.log(props);
            /*
            console.log("state");
            console.log(state);
            */
            console.log("props.alladdresses");
            console.log(props.alladdresses);
        }
        
        const hidden = !chkbox; // !state.chkbox;
        let addresses = null;
        if (props.alladdresses != null)
          addresses = props.alladdresses.map((child, i) => {
                return <Address id={i} addresssselected={props.addresssselected} 
                address={child} distance={props.distance}
                /> });
        if (Config.bDebug)
        {
            console.log("alladdresses");
            console.log(props.alladdresses);
            console.log("addresses");
            console.log(addresses);
            console.log("hidden");
            console.log(hidden);
        }
        if (chkbox)
        {
            return (
                <Fragment>                   
                    <h3 className={"h" +cssDark} tabIndex="0">Annetun osoitteen muita löytyneitä osoitteita</h3>
                    <input className={"input" +cssDark} tabIndex="0" type="checkbox" id="checkbox_id" name="checkbox_id" 
                    aria-label="Näytä osoitelista" 
                    defaultChecked={chkbox} 
                    onChange={handleChangeChk} />
                    <label className={"label" +cssDark} htmlFor="checkbox_id" >Näytä osoitelista</label>                    
                    <br/>
                    <div role="navigation" className={!chkbox ? 'hidden' : ''}>
                    <br/>
                     {addresses}                    
                    </div>                
               </Fragment>
            );    
        }
        else
            return (
            <Fragment>              
                <h3 className={"h" +cssDark} tabIndex="0">Annetun osoitteen muita löytyneitä osoitteita</h3>
                <input className={"input" +cssDark} tabIndex="0" type="checkbox" id="checkbox_id" name="checkbox_id"
                defaultChecked={chkbox} 
                onChange={handleChangeChk} />
                <label className={"label" +cssDark} htmlFor="checkbox_id">Näytä osoitelista</label>                   
            </Fragment>
            );
   // }
}

export default AddressList;
