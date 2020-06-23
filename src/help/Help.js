import { h, p, Component, Fragment } from 'preact';
// import StaticFunctions from '../util/StaticFunctions';
// import Card from 'preact-material-components/Card';
// import 'preact-material-components/Card/style.css';
// import 'preact-material-components/Button/style.css';
import style from './style';
//import style from './index';
import HeaderCss from './styleDark';

/**
 * This class is used to show help text for a user.
 */
class Help extends Component 
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
    
    render(props, state) {
            return(
                <section >
                        <h1 tabIndex="0">Ohje</h1>
                        <Fragment>
                            <Fragment>
                                <h3 tabIndex="0">Tarkoitus</h3>
                            </Fragment>
                            <p tabIndex="0">
                            Ohjelmalla tehdään kyselyjä annetun osoitteen liikennevälineiden tietyn osoitteen 
                    lähipysäkkien pysähtymisaikojen selville saamiseksi sekä toinen kysely lähtö- 
                    ja määränpääsoitteiden välisistä reiteistä sekä reitin liikennevälineiden 
                    vaihdoista, pysäkeistä ja pysähtymisajoista.
                            </p>
                            <h3 tabIndex="0">Tuetut selaimet</h3>
                            <p tabIndex="0">
                                Ohjelma ja sen html sivut eivät toimi IE eli Internet explorer 
                                selaimella, mutta muut sitä uudemmat selaimet ovat tuettuina. Eli ohjelma toimii niissä.
                            </p>
                            <h3 tabIndex="0">Käyttö</h3>
                            <p tabIndex="0" className={state.loaddarkstyle == true ? HeaderCss.p : 
                    style.p }>
                                Ohjelmaa voidaan käyttää selaimella, hiirellä klikkaamalla tai 
                                ruudunlukuohjelmalla (puhuu eri käyttöliittymän ja kyselyjen tulosten
                                kohtia) tai suurennusohjelmalla. Ulkoasu-painonapista 
                                voidaan valita joko vaalea tai musta tyyli käyttöliitymään. Oletus on musta.

                                Jos käytät ohjelmaa näppäimistön avulla hiiren sijasta, niin liikut tekstistä toiseen ja 
                                käyttöliittymän kontrollista toiseen, esim painonappiin, linkkiin tai siitä pois,
                                tab näppäimellä. Kun tab näppäimellä on valittu, esim linkki tai painonappi, niin 
                                se aktivoidaan eli valitaan, avataan enterin painalluksella. Jos se on linkki, sen 
                                alle avautuu esim kyselyjen tuottamaa esim pysäkkiaikoja tai reitin tietoja. 
                                Tämä web linkki saadaan päälle tai pois valitsemalla se uudelleen ja paimalla lopuksi 
                                enterin painamisella, kun se on aktiivinen. Radionappien kesken liikutaan nuoli 
                                vasemmalle tai oikealle. Shift+tab näppäimillä pääsee edelliseen 
                                käyttöliittymän aktiiviseen osaan eli esim painonappiin.
                            </p> 
                            <h3 tabIndex="0">1 Pysäkkikysely</h3>
                            <h4 tabIndex="0">1.1. radionappiryhmä ylinnä: Eli mistä tietoja haetaan, 3 vaihtoehtoa.</h4>
                            <p tabIndex="0">Jos kunta tai kaupunki sijaitsee HSL:n liikennealueella, valitse HSL  
                            radionappi. Jos paikkakunta on muualla, kyseinen 
                            valinta on joko FINLAND tai WALTTI. FINLAND kattaa koko suomen alueen.
                            WALTTI valitaan jos kyselyn tulosta ei tule
                            HSL tai FINLAND kyseiyillä ja kaupunki kuuluu WALTTI alueisiin.
                            </p>
                            <h4 tabIndex="0">1.2. tekstikenttä: Anna pysäkkien lähiosoite</h4>
                            <p tabIndex="0">Osoite kannattaa antaa tyyliin: Katu 10 Kaupunki.
                            </p>
                            <h4 tabIndex="0">1.3. tekstikenttä on vapaaehtoinen: Anna pysäkkien maksimi etäisyys</h4>
                            <p tabIndex="0">Anna pysäkkien maksimi etäisyys, esim. 800 metriä 
                            lähiosoitteesta. Oletus on 800 metriä.
                            </p>
                            
                            <h4 tabIndex="0">1.4. tekstikenttä on vapaaehtoinen: Anna lähtöaika</h4>
                            <p tabIndex="0">Anna lähtöaikojen kelloaika muodossa tt:mm tai 
                            päivämäärä muodossa pp.kk.yy tai muodossa pp.kk.yyyy tai pp.kk.yyyy tt:mm, 
                            esim. 24.06.2020 19:30    
                            </p>   
                            <h4 tabIndex="0">1.5. Haku painonappi: Suorittaa kyselyn</h4>
                            <h4 tabIndex="0">1.6. Keskeytä haku painonappi: Keskeyttää meneillään olevan kyselyn.</h4>
                            <h3 tabIndex="0">Kyselyn jälkeeen tulokset sivulla kuten alla:</h3>
                            <p tabIndex="0">Annetun osoitteen muita löytyneitä osoitteita</p>
                            <h4 tabIndex="0">1.7. radionappi: Näytä osoitelista<br/></h4>
                            <p tabIndex="0">Tulokset alla.</p>
                            <p tabIndex="0">Mannerheimintie 1 Helsinki:n pysäkit (pit 60.168037 lev 24.942321)</p>
                            <h4 tabIndex="0">1.8. radionappi: Näytä kaikkien pysäkkien pysähtymisajat</h4>
                            <p tabIndex="0">Valitsemalla tämä radionappi listataan muita lähiosoitteita, joita 
                            valitsemalla suoritetaan uusi kysely sillä osoitteella.</p>
                            <p tabIndex="0"><b>Pysäkkilinkkikista</b>, joiden web linkkejä klikkaamalla tai enterillä 
                            valitsemalla saadaan uusi lista linkin alle kunkin pysäkin 
                            haetut pysähtymisajat ja linjat kohteen kanssa. Uudelleen valitsemalla 
                            äsken avattu linkki, saadaan sen alainen luettelo sulkeutumaan.
                            </p>

                            <h3 tabIndex="0">2 Reittisunnitelma kysely</h3>
                            <h4 tabIndex="0">2.1. radionappiryhmä ylinnä: Eli mistä tietoja haetaan, 3 vaihtoehtoa</h4>
                            <p tabIndex="0">Jos kunta tai kaupunki sijaitsee HSL:n liikennealueella, valitse HSL  
                            radionappi. Jos paikkakunta on muualla, kyseinen 
                            valinta on joko FINLAND tai WALTTI. FINLAND kattaa koko suomen alueen.
                            WALTTI valitaan jos kyselyn tulosta ei tule
                            HSL tai FINLAND kyseiyillä ja kaupunki kuuluu WALTTI alueisiin.
                            </p>

                            <h4 tabIndex="0">2.2. tekstikenttä: Anna reitin lähtöosoite</h4>
                            <p tabIndex="0">Osoite kannattaa antaa tyyliin: Katu 10 Kaupunki.</p>

                            <h4 tabIndex="0">2.3. tekstikenttä: Anna reitin kohdeosoite</h4>
                            <p tabIndex="0">Osoite kannattaa antaa tyyliin: Katu 10 Kaupunki.</p>
                            <h4 tabIndex="0">2.4. tekstikenttä on vapaaehtoinen: Anna lähtöaikojen kelloaika</h4>
                            <p tabIndex="0">Anna lähtöaikojen kelloaika muodossa tt:mm tai 
                            päivämäärä muodossa pp.kk.yy tai muodossa pp.kk.yyyy tai pp.kk.yyyy tt:mm, 
                            esim. 24.06.2020 19:30    
                            </p>
                            <h4 tabIndex="0">2.5. Haku painonappi: Hae reittejä</h4>
                            <h4 tabIndex="0">2.6. Keskeytä haku painonappi</h4>
                            <p tabIndex="0">Keskeyttää meneillään olevan kyselyn. Jos ei kyselyä par'aikaa, niin ei aktiivinen.</p>

                            <h3 tabIndex="0">Tulokset kuten alla:</h3>
                            <p tabIndex="0">Hämeentie 10 Helsinki (pit 60.168037 lev 24.942321)<br/>
                            Mannerheimintie 1 Helsinki (pit 60.168037 lev 24.942321)<br/>
                            Tulokset alla.<br/>
                            </p>
                            
                            <p tabIndex="0"><b>Reittilinkkikista</b>, joiden web linkkejä klikkaamalla tai enterillä 
                            valitsemalla saadaan uusi lista linkin alle kunkin reitin haetut vaihdot pysäkkiaikoineen jne. 
                            Uudelleen valitsemalla äsken avattu linkki, saadaan sen alainen tiedot, luettelo sulkeutumaan.</p>
                            <Fragment>
                            <a tabIndex="0" aria-label="Pysäkit osoitteen mukaan"                         
                                href="/" >Pysäkit osoitteen mukaan</a><br/>
                            <a tabIndex="0" aria-label="Reittisuunnitelma" 
                                
                                href="/routeplan" >Reittisuunnitelma</a>			

                            </Fragment>
                        </Fragment>
                    </section>
            
            );
    }
}

export default Help;
