import { h, Component, Fragment } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import HeaderCss from './styleDark';

// const loaderDarkcss = () => import('./styleDark.css');
// const loadercss = () => import('./style.css');

/**
 * This component Header is displaying in header area and are used
 * for menu like use.
 * 
 * @param {*} props 
 */
class Header extends Component 
{
  
	style = null;
	// headerCssComp = ();

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
		<Fragment>
			<table className={state.loaddarkstyle == true ? HeaderCss.header : 
			style.header } alt="Valikko">
		   <tr className={state.loaddarkstyle == true ? HeaderCss.tr : 
			style.tr}><th>
		   <h3 className={state.loaddarkstyle == true ? 
			HeaderCss.h1 : style.h1 } tabIndex="0" >Pysäkit tekstitaikatauluiksi</h3>
			</th>
			<th><nav role="navigation" aria-label="pagination" >
				<Link aria-label="Pysäkit osoitteen mukaan" onClick={props.linkClicked}
				className={state.loaddarkstyle == true ? HeaderCss.link : style.link} href="/" >Pysäkit osoitteen mukaan</Link>
				<br/>
				<Link aria-label="Reittisuunnitelma" onClick={props.linkClicked}
				className={state.loaddarkstyle == true ? HeaderCss.link : style.link} href="/routeplan" >Reittisuunnitelma</Link>
				<br />
				</nav>
			</th>
			</tr>
			<tr className={state.loaddarkstyle == true ? HeaderCss.tr : 
			style.tr}><th>
			<button className={state.loaddarkstyle == true ? HeaderCss.button : style.button }
			onClick={props.changeStyle} aria-label="Ulkoasun vaihto">Ulkoasu</button>
			</th><th>
			<a tabIndex="0" aria-label="Apua"
			className={state.loaddarkstyle == true ? HeaderCss.link : style.link}
                        href="/apua" >Apua</a>	
			</th></tr>
		</table>
		<br/><br/><br/><br/><br/>
		</Fragment>	
		  );
	} 
}

export default Header;
