import { h, table, tr, th } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

/**
 * This functional component Header is displaying in header area and are used
 * for menu like use.
 * 
 * @param {*} props 
 */
const Header = (props) => (
	<div>
	<table className={style.header} alt="Valikko">
	   <tr><th>
	   <h3 className={style.h1} tabIndex="0" >Pysäkit tekstitaikatauluiksi</h3>
		</th>
		<th><nav aria-label="pagination" >
			<a aria-label="Pysäkit osoitteen mukaan" className={style.link} href="/" >Pysäkit osoitteen mukaan</a>
	    	<a aria-label="Pysäkit osoitteen mukaan" className={style.link} href="/routeplan" >Reittisuunnitelma</a>
   		 </nav>
		</th></tr>
		<tr><th> </th></tr>
	</table>
	 </div>	
);

export default Header;
