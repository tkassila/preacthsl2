import {h , Component} from 'preact';
import Config from '../util/Config';

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
        if (this.props.addresssselected == null)
            return;

        let distance = this.props.distance;
        if (distance == null || distance == '')
	        distance = '800';
	    this.props.addresssselected(event.target.text, distance);
    }

    render() {
        const nocallclickhandler = (this.props.addresssselected == null)
        if (nocallclickhandler)
        {
            return (
                <div data-message="lähiosoite" ><p>{this.props.address}</p></div>                              
              );  
        }
        else
        return (
              <div data-message="klikattu lähiosoite" ><a id={"addresslink" +this.props.id} href={"."} onClick={this.addressClicked}>{this.props.address}</a>
              </div>                              
            );
    }
}

export default Address;
