import { h, p, Component } from 'preact';
// import StaticFunctions from '../util/StaticFunctions';
// import Card from 'preact-material-components/Card';
// import 'preact-material-components/Card/style.css';
// import 'preact-material-components/Button/style.css';
//import style from './style';
//import style from './index';
import HeaderCss from './styleDark';
/**
 * This class is used to show help text for a user.
 */
function Help (props) {
    return(
        <section>
				<h1>Ohje</h1>
				<div>
					<div>
						<h3 tabIndex="0">Tarkoitus</h3>
					</div>
					<p tabIndex="0">
                    Ohjelmalla tehdään kyselyjä liikennevälineiden tietyn osoitteen 
            lähipysäkkien pysähtymisaikoja sekä toinen kysely lähtö- 
            ja määränpääsoitteiden välisistä reiteistä sekä yhden reitin 
            välisistä liikennereiteistä ja niiden reitin pysäkeista ja ajoista.
					</p>
                    <h3 tabIndex="0">Käyttö</h3>
					<p tabIndex="0">
                        Ohjelmaa voidaan käyttää selaimella, hiirellä klikkaamalla tai 
                        ruudunlukuohjelmalla (puhuu eri käyttöliittymän ja kyselyjen 
                        kohtia) tai suurennusohjelmalla. Ulkoasu-painonapista 
                        voidaan valita joko vaalea tai musta tyyli käyttöliitymään.

                        Jos käytät näppäimistöä hiiren sijasta, valitset painonappeja jne 
                        ja ohjelmassa liikutaan tab näppäimellä. Web linkki radionappi tai
                        valintanappi päälle tai pois valitaan enterin painamisella, kun se on 
                        aktiivinen. Radionappien kesken liikutaan nuoli vasemmalle tai oikealle. 
                        Shift+tab näppäimillä pääsee edelliseen käyttöliittymän aktiiviseen osaan 
                        eli esim painonappiin.
                    </p> 
                    <h3 tabIndex="0">Pysäkkikysely</h3>
					<p tabIndex="0">
                    <b>1. tekstikenttä:</b> Anna pysäkkien lähiosoite. Osoite 
                    kannattaa antaa tyyliin:<br/> katu 10 Kaupunki.
                    <br/>
                    <b>2. tekstikenttä:</b> Anna pysäkkien maksimi etäisyys, esim. 800 metriä 
                    lähiosoitteesta.    
                    <br/>
                    </p>
                    <p tabIndex="0">
                    <b>Ylinnä radionappi ryhmä:</b> Mistä tietoja haetaan, 3 vaihtoehtoa.    
                    <br/><br/>
                    Jos kunta tai kaupunki sijaitsee HSL:n liikennealueella, valitse vastaava
                    'Mistä tiedot haetaan' radionappi. Jos paikkakunta on muualla, kyseinen 
                    valinta on joko FINLAND tai WALTTI. FINLAND kattaa koko suomen alueen.
                    WALTTI valitaan jos kyselyn tulosta ei tule
                    HSL tai FINLAND kyseiyillä ja kaupunki kuuluu WALTTI alueisiin.
					</p>

                    <p tabIndex="0">
                    <b>Haku painonappi</b> Suorittaa kyselyn.<br/>
                    <b>Keskeytä haku painonappi</b> Keskeyttää meneillään olevan kyselyn.<br/>
					</p>

                    <h3 tabIndex="0">Reittisunnitelma kysely</h3>
					<p tabIndex="0">
                    <b>1. tekstikenttä:</b> Anna reitin lähtöosoite. Osoite 
                    kannattaa antaa tyyliin:<br/> katu 10 Kaupunki.<br/>
                    <b>2. tekstikenttä:</b> Anna reitin kohdeosoite. Osoite 
                    kannattaa antaa tyyliin: katu 10 Kaupunki.
                    </p>
                    <p tabIndex="0">
                    <b>Ylinnä radionappi ryhmä:</b> Mistä tietoja haetaan, 3 vaihtoehtoa.    
                    <br/><br/>                    
                    Jos kunnat tai kaupungit sijaitsevat HSL:n liikennealueella, valitse vastaava
                    'Mistä tiedot haetaan' radionappi. Jos paikkakunnat ovat muualla, mutta 
                    koko suomen alueella, kyseinen valinta on silloin FINLAND. 
                    WALTTI valitaan jos kyselyn tulosta ei tule HSL tai FINLAND kyseiyillä 
                    ja kaupunki kuuluu WALTTI alueisiin.
					</p>
                    
                    <br/>
                    <div>
                    <a tabIndex="0" aria-label="Pysäkit osoitteen mukaan" 
                        
                        href="/" >Pysäkit osoitteen mukaan</a><br/>
                    <a tabIndex="0" aria-label="Reittisuunnitelma" 
                        
                        href="/routeplan" >Reittisuunnitelma</a>			

                    </div>
				</div>
			</section>
    
    );
}

export default Help;
