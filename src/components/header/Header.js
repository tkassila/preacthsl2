import { h, table, tr, th } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = (props) => (
	<div>
	<table className={style.header} alt="Valikko">
	   <tr><th>
		<h3 className={style.h1}>Pysäkit tekstitaikatauluiksi</h3>
		</th>
		<th><nav >
			<Link aria-current="page" className={style.link} href="/" >Pysäkit osoitteen mukaan</Link>
	    	<Link aria-current="page" className={style.link} href="/routeplan" >Reittisuunnitelma</Link>
   		 </nav>
		</th></tr>
		<tr><th> </th></tr>
	</table>
	 </div>	
);

export default Header;
