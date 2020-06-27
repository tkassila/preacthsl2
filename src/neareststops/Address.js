import {h , Component } from 'preact';
import { useContext } from 'preact/compat';
import Config from '../util/Config';
import CssDark from '../context/Context';


/**
 * This Address class is showing a address.
 */
class Address extends Component 
{
    constructor(props) {        
        super(props);
      if (Config.bDebug)
      {
        console.log("Address::constructor");
        console.log(this.props);
      }
        /*
        this.state = {
            chkbox: false,
            addresses: ['1','2']
        }
        */
    }

    componentWillReceiveProps(nextProps) {
        /*
        if (this.props.address !== nextProps.address) {
          this.setState({address: nextProps.address});
        }
        */
     }

    addressClicked = event => {     
        event.preventDefault();   
        if (this.props.addresssselected === null)
            return;

        let distance = this.props.distance;
        if (distance == null || distance === '')
	        distance = '800';
	    this.props.addresssselected(event.target.text, distance);
    }

    render(props) {
        const cssDark = useContext(CssDark);
        const nocallclickhandler = (this.props.addresssselected == null)
        if (nocallclickhandler)
        {
            return (
                <div className={"div" +cssDark} data-message="lähiosoite" >
                  <p className={"p" +cssDark}>{this.props.address}</p>
                  </div>                              
              );  
        }
        else
        return (
              <div className={"div" +cssDark} data-message="klikattu lähiosoite" >
                <a className={"a" +cssDark} id={"addresslink" +this.props.id} href={"."} onClick={this.addressClicked}>{this.props.address}</a>
              </div>                              
            );
    }
}

export default Address;
