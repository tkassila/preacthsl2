import { h, table, tr, th, createRef, Component } from 'preact';
// import { Link } from 'preact-router/match';
import style from './style';
import HeaderCss from './styleDark';

// const loaderDarkcss = () => import('./styleDark.css');
// const loadercss = () => import('./style.css');

/**
 * This functional component Header is displaying in header area and are used
 * for menu like use.
 * 
 * @param {*} props 
 */
class Header extends Component 
{
  
	style = null;
	headerCssComp = createRef();

	constructor(props) {
		super(props);
	    this.state = { 
		loaddarkstyle: props.loaddarkstyle
		}	  
    }

	shouldComponentUpdate(nextProps, nextState)
	{
		if (nextProps.loaddarkstyle != null 
			&& nextProps.loaddarkstyle != undefined)
		{
			this.setState({loaddarkstyle: nextProps.loaddarkstyle});
		}
		return true;
	}

	componentDidMount()
	{
	
	}

    render(props, state) {
      return (
		<div>
		<table className={state.loaddarkstyle == true ? HeaderCss.header : style.header } alt="Valikko">
		   <tr><th>
		   <h3 className={state.loaddarkstyle == true ? HeaderCss.h1 : style.h1 } tabIndex="0" >Pysäkit tekstitaikatauluiksi</h3>
			</th>
			<th><nav aria-label="pagination" >
				<a aria-label="Pysäkit osoitteen mukaan" className={state.loaddarkstyle == true ? HeaderCss.link : style.link} href="/" >Pysäkit osoitteen mukaan</a>
				<a aria-label="Reittisuunnitelma" className={state.loaddarkstyle == true ? HeaderCss.link : style.link} href="/routeplan" >Reittisuunnitelma</a>
				</nav>
			</th><button className={state.loaddarkstyle == true ? HeaderCss.button : style.button }onClick={props.changeStyle} aria-label="Ulkoasun vaihto">Ulkoasu</button></tr>
			<tr><th> </th></tr>
		</table>
		 </div>	
		  );
	} 
}

export default Header;
