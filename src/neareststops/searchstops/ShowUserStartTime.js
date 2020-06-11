// import React, { p } from 'preact';
import Config from '../../util/Config';
import StaticFunctions from '../../util/StaticFunctions';
import moment from 'moment';
/**
 * This class is used to show a bus stop or like that.
 * 
 * @param {*} props 
 */
function ShowUserStartTime(props) {
{ 
        let ret = null; // role="option"
        if (Config.bDebug)
        {
            console.log("ShowUserStartTime");
            console.log("starttime");
            console.log(props.starttime);
        }
        if (props.starttime != null && props.starttime.toString().hasDataAfterTrim())
        {
            // moment.utc(props.starttime*1000).format('HH:mm');
            // let stime = moment.utc(props.starttime*1000).toDate();

            let stime = props.starttime; // moment.utc(secs*1000).format('DD.MM.YYYYY HH:mm:ss'); // new Date(props.starttime    );
            let mins = stime.getMinutes();
            let lenmins = mins.toString().length;
            if (lenmins == 1)
                mins = "0" +mins;
            ret = "Lähtöajaksi annettu " +stime.getDate() +"." +(stime.getMonth() +1)
                        +"." +stime.getFullYear() +" "
                        +stime.getHours() +":" +mins;    
        }

        if (ret == null)
            return (<div></div>);
        else
        return ( <div tabIndex="0" aria-label={"" + ret}>
            <b> {ret} </b>
            </div>
        );
    }
}


export default  ShowUserStartTime;