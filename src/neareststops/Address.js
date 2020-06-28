import {h , Component } from 'preact';
import { useContext } from 'preact/compat';
// import { useState, useEffect  } from 'preact/hooks';
import Config from '../util/Config';
import CssDark from '../context/Context';


/**
 * This Address function is showing a address.
 */
// class Address extends Component 
const Address = (props) =>
{
  //  const [addresssselected] = useState(props.addresssselected);
  //  const [distance, setDistance] = useState(props.distance);

    /*
    constructor(props) {        
        super(props);
      if (Config.bDebug)
      {
        console.log("Address::constructor");
        console.log(this.props);
      }       
    }

    componentWillReceiveProps(nextProps) {
     }
     */

    const addressClicked = event => {     
        event.preventDefault();   
        if (props.addresssselected === null)
            return;

      //  if (distance == null || distance === '')
        //  setDistance('800');
        props.addresssselected(event.target.text);
    }

    // render(props) {
        const cssDark = useContext(CssDark);
        const nocallclickhandler = (props.addresssselected == null)
        if (nocallclickhandler)
        {
            return (
                <div className={"div" +cssDark} data-message="lähiosoite" >
                  <p className={"p" +cssDark}>{props.address}</p>
                  </div>                              
              );  
        }
        else
        return (
              <div className={"div" +cssDark} data-message="klikattu lähiosoite" >
                <a className={"a" +cssDark} id={"addresslink" +props.id} href={"."} onClick={addressClicked}>{props.address}</a>
              </div>                              
            );
   // }
}

export default Address;
