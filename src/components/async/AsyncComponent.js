import { h, Component } from "preact";
import Loading from "./Loading"; // your own spinner cmp here obviously

class AsyncComponent extends Component {

  delay = null;

  constructor(props)
  {
    super(props);
    this.state = {
      Cmp: null,
      pastDelay: false
    };  
    this.delay = null;
    // this.cssloader = createRef();
    // this.changeStyleSheet();
  }

  componentDidMount() {
    // only show the spinner after 200ms has passed. this improves speed perception.
    // Also, when this particular route is revisited again, the spinner won't show up
    this.delay = setTimeout(() => {
      this.setState({ pastDelay: true });
    }, 200);
    this.getComponent();
  }

  componentWillUnmount() {
    clearTimeout(this.delay);
  }

  getComponent = async () => {
    if (!this.state.Cmp) {
      try {
        const { default: Cmp } = await this.props.moduleProvider();
        this.setState({ Cmp });
      } catch (err) {
        console.log("AsyncComponent::getComponent error ");
        console.log(err);        
        /* Handle failure to load dynamic component */
      }
    }
  };

  render(props, { Cmp, pastDelay }) {
    // if Cmp is defined, show it. Otherwise, if 200ms has passed AND still no Cmp, then show spinner
    return (Cmp ? <Cmp {...props} /> : pastDelay && <Loading isFullPage />);
  }
}

export default AsyncComponent;