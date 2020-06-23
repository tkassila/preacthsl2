import { h, Component } from "preact";

import AsyncComponent from "../components/async/AsyncComponent";
// import { setupNavbar } from "./Navbar/Navbar";

// we gonna import this 'PaymentLoader' instead of the real 'Payment' component later when we lay out our routes later. You will see.
class NearestStopsLoader extends Component {
  constructor(props) {
    super(props);
    
    // this is where you make your mobile app behaves like a native app; your application shell is always there during navigation!
    // https://developers.google.com/web/updates/2015/11/app-shell
   // setupNavbar({ title: "Payment" });
  }

  render(props) {
    return (
      // see, we are using our AsyncComponent here to lazy load the 'Payment' screen when its path is matched.
      // also, we do {...props} to pass whatever props is passed from preact-router! 
      // Useful for path like '/payment/:transactionId', so 'Payment' can then do this.props.transactionId !Damn!
      <AsyncComponent
        {...props}
        moduleProvider={() => import(/* webpackChunkName: "neareststops" */ "./NearestStops")}
      />
    );
  }
}

export default NearestStopsLoader;