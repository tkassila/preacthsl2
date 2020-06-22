import { Component  } from 'preact';
import Config from './Config';
import moment from 'moment';

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
}; 

Boolean.prototype.hasData = function () {
    return this.toString().length !== 0;
};

Boolean.prototype.hasDataAfterTrim = function () {
    return this.toString().trim().length !== 0;
};

Number.prototype.hasData = function () {
    return this.toString().length !== 0;
};

Number.prototype.hasDataAfterTrim = function () {
    return this.toString().trim().length !== 0;
};

String.prototype.hasData = function () {
    return this.toString().length !== 0;
};

String.prototype.hasDataAfterTrim = function () {
    return this.toString().trim().length !== 0;
};

/*
BigInt.prototype.hasData = function () {
    return this.toString().length !== 0;
};

BigInt.prototype.hasDataAfterTrim = function () {
    return this.toString().trim().length !== 0;
};
*/


class StaticFunctions  extends Component {

    static getRouteType(typevalue)
    {
        /*
         	Indicates the type of transportation used on a route. Valid options are:

0 - Tram, Streetcar, Light rail. Any light rail or street level system within a metropolitan area.
1 - Subway, Metro. Any underground rail system within a metropolitan area.
2 - Rail. Used for intercity or long-distance travel.
3 - Bus. Used for short- and long-distance bus routes.
4 - Ferry. Used for short- and long-distance boat service.
5 - Cable tram. Used for street-level rail cars where the cable runs beneath the vehicle, e.g., cable car in San Francisco.
6 - Aerial lift, suspended cable car (e.g., gondola lift, aerial tramway). Cable transport where cabins, cars, gondolas or open chairs are suspended by means of one or more cables.
7 - Funicular. Any rail system designed for steep inclines.
11 - Trolleybus. Electric buses that draw power from overhead wires using poles.
12 - Monorail. Railway in which the track consists of a single rail or a beam.
*/
        switch(typevalue)
        {
            case 0: 
                return "TRAM";
                break;
            case 1: 
                return "SUBWAY";
                break;
            case 2: 
                return "RAIL";
                break;
            case 3: 
                return "BUS";
                break;
            case 4: 
                return "FERRY";
                break;
            case 5: 
                return "TRAM";
                break;
            case 6: 
                return "AIRPLANE";
                break;
            case 7: 
                return "FUNICULAR";            
                break;
            case 11:
                return "BUS";            
                break;
            case 12: 
                return "RAIL";            
                break;
            default:
                {
                    console.log("getRouteType");
                    console.log("default typevalue = unknown value:");
                    console.log(typevalue);
                    return typevalue;
                }                    

        }
    }

    static getTransportMode(mode)
    {
        switch(mode)
        {
            case "WALK":
                return "Kävely";
                break;
            case "AIRPLANE":
                    return "Lentokone";
                    break;
            case "BICYCLE":
                     return "Polkupyörä";
                     break;
            case "AIRPLANE":
                     return "Lentokone";
                     break;
            case "BUS":
                     return "Bussi";
                     break;
            case "CABLE_CAR":
                     return "Kaapeliauto";
                     break;
            case "CAR":
                    return "Auto";
                    break;
            case "FERRY":
                    return "Lautta";
                    break;
            case "FUNICULAR":
                    return "Köysirata";
                    break;
            case "GONDOLA":
                    return "Gondoli";
                    break;
            case "RAIL":
                    return "Rautatie";
                    break;
            case "SUBWAY":
                    return "Metro";
                    break;
            case "TRAM":
                    return "Raitiovaunu";
                    break;
            case "TRANSIT":
                    return "Ylikulku, kauttakulku";
                    break;
            case "LEG_SWITCH":
                    return "";
                    break;
                    
               default:
                {
                    console.log("getTransportMode");
                    console.log("default value = unknown value:");
                    console.log(mode);
                    return '';  
                }
         }
    }

    static getLegName(leg)
    {
        if (leg === null)
            return "";

        let name = leg.mode;
        if (leg.route != null)
        {
            return leg.route.shortName +" " +leg.route.longName;
        }
        
        return StaticFunctions.getTransportMode(name);
    }

    
    static getLegVehicleType(leg)
    {
        if (leg === null)
            return "";

        if (Config.bDebug)
        {
            console.log("getLegVehicleType");
            console.log("leg");
            console.log(leg);        
        }
        
        let type = leg.vehicleType;
        if (type != null)
        {
            return StaticFunctions.getTransportMode(
                StaticFunctions.getRouteType(type));
        }
        
        return '';
    }

    static getRoundedMeterDistance(distance)
    {
        if (distance == null)
            return "";

        if (Config.bDebug)
            console.log("distance: " +distance);
        if (distance == null || (distance == "NaN" || distance.toString().includes("NaN")))
            return "";
        if (isNaN(distance))
            return distance;
        let ret = Math.ceil(distance);
        if (ret == null || (ret == "NaN" || ret.toString().includes("NaN")))
        {
            console.log("after Math.ceil:");
            console.log("distance is distance: " +distance);
            console.log("distance is NaN: " +ret);
            return "";
        }

        return ret;
    }

    //mergeArrToJSON = (a, b) => a
  //  .map((item, i) => ({[item]: b[i]})) 
  //  .reduce((json,val)=>Object.assign({},json,val));

  static assignArrItems = (a, b) => {
    if (a == null  || b == null || a.length !== b.length)
        return null;

  var i;
  let obj = {};
  for (i = 0; i < a.length; i++) {
      Object.assign(a[i], b[i])
  } 
  return a;
}


static getDateFromUnixSeconds(unixTimestamp)
{
    if (unixTimestamp == null)
        return null;
    //let dateObj = new Date(unixTimestamp * 1000); 
    if (isNaN(unixTimestamp))
    {
        console.log("StaticFunctions::getDateFromUnixSeconds:" +unixTimestamp);
        return null;
    }
    let dateObj = new Date(unixTimestamp);     
    return dateObj;
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getHourFormat(iLen, momenttime)
{
    if (momenttime == null)
        return '';
    momenttime = momenttime.trim();
    iLen = momenttime.length;
    if (iLen == 1)
        throw 'error_time_missing';
    if (isNaN(momenttime))
        throw 'error_time_wrong';
    if (iLen == 1)
       return "h";
    else
    if (iLen == 2)
        return "hh";
    if (iLen > 2)
        throw 'error_time_wrong';
    throw 'error_time_unknowvalue';
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getHourMinWithSpaceFormat(momenttime)
{
    if (momenttime == null)
        return null;
    momenttime = momenttime.trim();
    let arrValues = momenttime.split(" ");
    let arrlen = arrValues.length;
    if (arrlen == 0)
        throw 'error_time_missing';
    else
    if (arrlen == 1)
        throw 'error_time_missing';
    else
    if (arrlen == 2)
    {
        if (arrValues[0] == null)
            throw 'error_time_hour_missing';
        if (arrValues[1] == null)
            throw 'error_time_min_missing';
        let arrlen1 = arrValues[0].length;
        let arrlen2 = arrValues[1].length;
        if (arrlen1 == 0)
            throw 'error_time_hour_missing';
        if (arrlen2 == 0)
            throw 'error_time_min_missing';
        if (isNaN(arrValues[0]))
            throw 'error_time_hour_wrong';
        if (isNaN(arrValues[1]))
            throw 'error_time_min_wrong';
        if (arrlen1 > 2)
            throw 'error_time_hour_wrong';
        if (arrlen2 > 2)
            throw 'error_time_min_wrong';
        let format1 = "hh";
        if (arrlen1 == 1)
            throw 'error_time_hour_wrong';
        let format2 = "mm";
        if (arrlen2 == 1)
            throw 'error_time_min_wrong';
        return format1 +" " +format1;
    }
    throw 'error_time_unknowvalue';
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateDayFormat(dayvalue)
{
    if (dayvalue == null || dayvalue.trim().length == 0)
        throw 'error_date_missing';
    dayvalue = dayvalue.trim();
    let len = dayvalue.length;
    if (len == 0)
        throw 'error_day_missing';
    if (len > 2)
        throw 'error_day_wrong';
    if (isNaN(dayvalue))
        throw 'error_day_wrong';
    let format = "DD";
    if (len == 1)
        format = "D";
    return format;
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateMonthFormat(montvalue)
{
    if (montvalue == null || montvalue.trim().length == 0)
        return '';
    montvalue = montvalue.trim();
    let len = montvalue.length;
    if (len == 0)
        throw 'error_month_missing';
    if (len > 2) // possible at the end is time value:
    {
        // check possible time after month value:
        let ind = montvalue.indexOf(" ");
        if (ind == -1)
            throw 'error_month_wrong';
        montvalue = montvalue.split(" ")[0];
        if (montvalue != null)
        {
            montvalue = montvalue.trim();
            len = montvalue.length;
            if (len > 2)
                throw 'error_month_wrong';
        }
        else
            throw 'error_month_missing';
    }
    if (isNaN(montvalue))
        throw 'error_month_wrong';
    let format = "MM";
    if (len == 1)
        format = "M";
    return format;
}

/**
 * get possilb time format after month value
 * 
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateMonthTimeFormat(montvalue)
{
    if (montvalue == null || montvalue.trim().length == 0)
         return '';
    montvalue = montvalue.trim();
    let len = montvalue.length;
    if (len > 2)
    {
        // check possible time after month value:
        let ind = montvalue.indexOf(" ");
        if (ind == -1)
            return '';
        let time = montvalue.split(" ")[1];
        if (time == null)
            throw 'error_time_missing';
        format = StaticFunctions.getHourMinFormat(time);
        return format;
    }
    return '';
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateYearFormat(yearvalue)
{
    if (yearvalue == null || yearvalue.trim().length == 0)
        throw 'error_year_unknowvalue';
    yearvalue = yearvalue.trim();
    let len = yearvalue.length;
    if ((len > 4 || len > 2) && yearvalue.indexOf(" ") != -1)
    {
        // get year before time:
        yearvalue = yearvalue.split(" ")[0];
        if (Config.bDebug)
            console.log("date 2: yearvalue= '" +yearvalue +"'");
        if (yearvalue == null)
            throw 'error_year_unknowvalue';
        len = yearvalue.length;
    }
    if (len != 1 && len != 2 && len != 4 )
        throw 'error_year_wrong';
    if (isNaN(yearvalue))
        throw 'error_year_wrong';        
    let format = "YYYY";
    if (len == 2)
        format = "YY";
    if (len == 1)
        format = "Y";
    if (Config.bDebug)
        console.log("date 3: format= '" +format +"'");
    return format;
}

static getErrorMsg(msg)
{
    if (msg == null || msg == '')
        return null;
    let ret = <div className="error"><space> </space><h3>Virhe: {msg}</h3></div>;
    return ret;
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateYearTimeFormat(yearvalue)
{
    if (yearvalue == null || yearvalue.trim().length == 0)
         return '';
    yearvalue = yearvalue.trim();
    let len = yearvalue.length;
    if (len > 1)
    {
        // check possible time after year value:
        let ind = yearvalue.indexOf(" ");
        if (ind == -1)
            return '';
        let time = yearvalue.split(" ")[1];        
        if (time == null)
            throw 'error_year_unknowvalue';
        let format = StaticFunctions.getHourMinFormat(time);
        return format;
    }
    return '';
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateFormat(momenttime)
{
    if (momenttime  == null)
        return null;
    let arrValues = momenttime.split(".");
    let arrlen = arrValues.length;
    if (arrlen == 0)
        throw 'error_unknowvalue_withseparator';
    else
    if (arrlen == 1)
        throw 'error_unknowvalue_withseparator';
    else
    {
        let format1 = "";
        let format2 = "";
        let format3 = "";
        let format4 = "";

        console.log("date: arrlen= " +arrlen);
        if (arrlen == 2 && Config.bDebug)
        {
            console.log("date: arrValues[0]");
            console.log("'" +arrValues[0] +"'");
            console.log("date: arrValues[1]");
            console.log("'" +arrValues[1] +"'");
        }
        if (arrlen == 3 && Config.bDebug)
        {
            console.log("date: arrValues[0]");
            console.log("'" +arrValues[0] +"'");
            console.log("date: arrValues[1]");
            console.log("'" +arrValues[1] +"'");
            console.log("date: arrValues[2]");
            console.log("'" +arrValues[2] +"'");
        }
        if (arrlen == 4 && Config.bDebug)
        {
            console.log("date: arrValues[0]");
            console.log("'" +arrValues[0] +"'");
            console.log("date: arrValues[1]");
            console.log("'" +arrValues[1] +"'");
            console.log("date: arrValues[2]");
            console.log("'" +arrValues[2] +"'");
            console.log("date: arrValues[3]");
            console.log("'" +arrValues[3] +"'");
        }

        if (arrlen == 2 || (arrlen == 3 && (arrValues[2] == null
            || arrValues[2].trim().length == 0)))
        {
            console.log("date: arrValues[2]");
            format1 = StaticFunctions.getDateDayFormat(arrValues[0]);
            format2 = StaticFunctions.getDateMonthFormat(arrValues[1]);
            // get possible time format:
            format4 = StaticFunctions.getDateMonthTimeFormat(arrValues[1]);
        }
        else
        if (arrlen == 3 || (arrlen == 4 && (arrValues[3] == null
            || arrValues[3].trim().length == 0)))
        {
            format1 = StaticFunctions.getDateDayFormat(arrValues[0]);
            format2 = StaticFunctions.getDateMonthFormat(arrValues[1]);
            format3 = StaticFunctions.getDateYearFormat(arrValues[2]);
            // get possible time format:
            format4 = StaticFunctions.getDateYearTimeFormat(arrValues[2]);         
        }    
        else
        if (arrlen == 4)
        {
            if (arrValues[3] == null || arrValues[3].trim().length == 0)
            {
                format1 = StaticFunctions.getDateDayFormat(arrValues[0]);
                format2 = StaticFunctions.getDateMonthFormat(arrValues[1]);
                format3 = StaticFunctions.getDateYearFormat(arrValues[2]);
                // get possible time format:
                format4 = StaticFunctions.getDateYearTimeFormat(arrValues[2]);
            }
            else
            {
                format1 = StaticFunctions.getDateDayFormat(arrValues[0]);
                format2 = StaticFunctions.getDateMonthFormat(arrValues[1]);
                format3 = StaticFunctions.getDateYearFormat(arrValues[2]);
                // get possible time format:
                format4 = StaticFunctions.getDateYearTimeFormat(arrValues[3]);
            }
        }    

        if (Config.bDebug)
        {
            console.log("date: format1");
            console.log("'" +format1 +"'");
            console.log("date: format2");
            console.log("'" +format2 +"'");
            console.log("date: format3");
            console.log("'" +format3 +"'");
            console.log("date: format4");
            console.log("'" +format4 +"'");
        }

        let ret = format1 +"." +format2 
        +(format3 != null && format3.trim().length != 0 ? "." +format3 : "") 
        +(format4 != null && format4.trim().length != 0 ? " " +format4 : "");
        if (Config.bDebug)
            console.log("date format ret:'" +ret +"'");
        return ret;
    }
    throw 'error_unknowvalue_withseparator';
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getHourMinFormat(momenttime)
{
    if (momenttime == null)
        return "";
    
    momenttime = momenttime.trim();
    let indPossibleHourMinTimeWithColon = momenttime.indexOf(":");
    let indSpace = momenttime.indexOf(" ");
    let iLen = momenttime.length;
    if (indPossibleHourMinTimeWithColon == -1)
    {
        if (indSpace == -1)
        {
            return StaticFunctions.getHourMinFormat(momenttime); // StaticFunctions.getHourFormat(iLen, momenttime);
        }
        else // constains space
        {
            return StaticFunctions.getHourMinWithSpaceFormat(momenttime);
        }
        throw 'error_time_unknowvalue';
    }
    else
    {
        let arrtime = momenttime.split(":");
        let arrlen = arrtime.length;
        if (arrlen != 2)
            throw 'error_time_wrong';
        let hour = arrtime[0];
        let hourlen = hour.length;
        if (hourlen < 1 || hourlen > 2)
            throw 'error_time_hour_wrong';
        if (isNaN(hour))
            throw 'error_time_hour_wrong';      
        let formatHour = "hh";
        if (hourlen == 1)
            formatHour = "h"
        let min = arrtime[1];
        let minlen = min.length;
        if (minlen < 1 || minlen > 2)
            throw 'error_time_min_wrong';
        if (isNaN(min))
            throw 'error_time_min_wrong';      
        let formatMin = "mm";
        if (minlen == 1)
            throw 'error_time_min_wrong'; 
        return formatHour +":" +formatMin;
    }
    throw 'error_time_unknowvalue';
}

static getMomentFormatAndNumbersCheck(momenttime)
{
    if (momenttime == null || momenttime.trim().length == 0)
        return null;
    momenttime = momenttime.trim();
    let indPossibleHourMinTimeWithColon = momenttime.indexOf(":");
    let indPossibleDate = momenttime.indexOf(".");
    let indSpace = momenttime.indexOf(" ");
    let iLen = momenttime.length;
    if (indPossibleDate == -1)
    {
        if (indPossibleHourMinTimeWithColon == -1)
        {
            if (indSpace == -1)
            {
                return StaticFunctions.getHourFormat(iLen, momenttime);
            }
            else // constains space
            {
                return StaticFunctions.getHourMinWithSpaceFormat(momenttime);
            }
            throw 'error_unknowvalue';
        }
        else
        {   // should be a time::
            return StaticFunctions.getHourMinFormat(momenttime);
        }
      //  throw 'error_unknowvalue_withseparator';
    }
    else
    {   // should be almost date, and possilbe a time also::
        return StaticFunctions.getDateFormat(momenttime);
    }
   // throw 'error_unknowvalue_withseparator';
}

static getStartTimeErrorMsg(msg)
{
    if (Config.bDebug)
    {
        console.log("getStartTimeErrorMsg: " +msg);
    }

    if (msg == null || msg.toString().trim().length == 0)
        return "";
    let starUserMsg = "Korjaa: ";
    let endUserMsg = " Anna lähtöaika muodossa: tt:mm tai muodossa: pp.kk.vv tai pp.kk.vvvv tai molemmat muodossa: pp.kk.vv tt:mm";
    switch(msg)
    {
        case "error_time_unknowvalue":
            return starUserMsg +" tuntematon aika virhe. " +endUserMsg;
            break;
        case "error_month_datelength_withseparator":
            return starUserMsg +" pvm kuukausi virhe. " +endUserMsg;
            break;
        case "error_month_datelength_withseparator":
            return starUserMsg +" päivä virhe. " +endUserMsg;
            break;
        case "error_month_unknowvalue":
            return starUserMsg +" pvm kuukaisi virhe. " +endUserMsg;
            break;
        case "error_date_unknowvalue":
            return starUserMsg +" päivä virhe. " +endUserMsg;
            break;
        case "Invalid Date":
                return starUserMsg +"väärä pvm tai kelloaika arvo. " +endUserMsg;
            break;
        default:
            console.log("getStartTimeErrorMsg unknow err msg: " +msg);
            return starUserMsg +"" +endUserMsg;
            break;
    }
}

static getTodayDateFromTime(hours, format, minutes = null)
{
    var dateObj = new Date();
    if (format == null)
    {
        if (minutes == null)
            dateObj.setHours(hours);
        else
            dateObj.setHours(hours, minutes);    
    }
    else
    {
        //let msecs = Date.parse(hours, format);
        // dateObj = new Date(msecs);
        dateObj = moment(hours, format, false).toDate();;
    }
    return dateObj;
}

static getUnixSecondsFromDate(dateObj)
{
    //let dateObj = new Date(unixTimestamp * 1000); 
    let ret = Math.floor(dateObj.getTime() / 1000);
    return ret;
}

static getToStringFromEndTime(utcSeconds, arrivalDelay)
{
   // return this.getDateTimeFromEpochTime(utcSeconds).toString();
   let time = StaticFunctions.getDateFromUnixSeconds(utcSeconds - arrivalDelay);
   //let utcString = dateObj.toUTCString(); 
   // let time = utcString.slice(-11, -4);
   let mins = time.getMinutes();
   if (mins < 10)
      mins = "0" +mins;
   let hours = time.getHours();
   if (hours < 10)
       hours = "0" +hours;
   let utcString = hours +":" +mins;
   return utcString;
}

static getDateTimeFromEpochTime(utcSeconds)
{
    // let utcSeconds = 1234567890;
    if (Config.bDebug)
    {
        console.log("this.hsl_baseurl");
        console.log("utcSeconds");
        console.log(utcSeconds);        
    }
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);        
    if (Config.bDebug)
    {
        console.log("return d");
        console.log(d);        
    }
    return d;
}

static getStopIdAfterStartID(stopid)
{
  if (stopid == null || stopid.trim().length == 0)
    return -1;
  let pos = stopid.indexOf(':');
  if (pos == null || pos == -1)
      return -1;
  let afterId = stopid.substring(pos+1);
  return afterId;    
}

static getSecondsIntoMinutes(seconds)
{
    if (seconds == null || seconds == 0)
        return "";
    if (seconds < 1)
        return "0";
    let mins = Math.floor(seconds / 60);
    if (mins == null || mins == 0)
        return "";
    return mins;
}


static trimMidleSpacies(value)
{
   if (value == null)
      return null;
   let ind = value.lastIndexOf(" ");
   if (ind == -1)
      return value;
    while (/\s{2,}/i.test(value))
    {
        value = value.replace(/\s{2,}/i, ' ');
    }
   return value.replace(/\s{2,}/i, ' ');
}

static getSpaceBeforeOf(obj)
{
  if (obj == null)
    return null;
  return ' ' +obj;
}

static async postData(url = '', fetchparam = {}) {

    /*
      let strReferer = "";
      let strReferrerPolicy = "no-referrer";
      let strMode = "same-origin";
      let strcredentials = "same-origin";
      let headers = {};
      if (!Config.bUseOwnGatewayServer) 
      {
        strReferer = "about:client";
        strReferrerPolicy = "strict-origin-when-cross-origin";
        strMode = "cors";s
        strcredentials = "same-origin";

      const response = await fetch(url, fetchparam);
      return response; // parses JSON response into native JavaScript objects

      }
      */

      /*
      let testthis = true;
      if (testthis)
      {
        fetchparam.mode = 'no-cors'; // no-cors, *cors, same-origin
      }
      */

      // mode: 'no-cors'; // no-cors, *cors, same-origin
     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     // credentials: 'same-origin', // include, *same-origin, omit
     // redirect: 'follow', // manual, *follow, error
     // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

      // Internet Explorer 6-11
      const isIE = /*@cc_on!@*/false || !!document.documentMode;
      if (isIE != null && isIE)
      {
        await fetch(url, fetchparam).then(async (response)=> {
        return await response;
        });
      }
      else
      {
        const response = await fetch(url, fetchparam);
        return response; // parses JSON response into native JavaScript objects
      }
  }
 

}


export default StaticFunctions;