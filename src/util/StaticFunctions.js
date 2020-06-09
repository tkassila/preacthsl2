import { Component  } from 'preact';
import Config from './Config';
import moment from 'moment';

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
    if (isNaN(momenttime))
        throw 'error_time_unknowvalue';
    if (iLen == 1)
       return "h";
    else
    if (iLen == 2)
        return "hh";
    if (iLen > 2)
        throw 'error_time_unknowvalue';
    return null;
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getHourMinWithSpaceFormat(momenttime)
{
    let arrValues = momenttime.split(" ");
    let arrlen = arrValues.length;
    if (arrlen == 0)
        throw 'error_time_unknowvalue';
    else
    if (arrlen == 1)
        throw 'error_time_unknowvalue';
    else
    if (arrlen == 2)
    {
        let arrlen1 = arrValues[0].length;
        let arrlen2 = arrValues[1].length;
        if (isNaN(arrValues[0]))
            throw 'error_time_unknowvalue';
        if (isNaN(arrValues[1]))
            throw 'error_time_unknowvalue';
        if (arrlen1 > 2)
            throw 'error_time_unknowvalue';
        if (arrlen2 > 2)
            throw 'error_time_unknowvalue';
        let format1 = "hh";
        if (arrlen1 == 1)
            format1 = "h";
        let format2 = "mm";
        if (arrlen2 == 1)
            format2 = "m";
        return format1 +" " +format1;
    }
    throw 'error_time_unknowvalue';
}

/**
 * called from another time format functions:
 * 
 * @param {*} iLen 
 */
static getDateFormat(momenttime)
{
    let arrValues = momenttime.split(".");
    let arrlen = arrValues.length;
    if (arrlen == 0)
        throw 'error_unknowvalue_withseparator';
    else
    if (arrlen == 1)
        throw 'error_unknowvalue_withseparator';
    else
    if (arrlen >= 2)
    {
        if (arrlen > 3)
            throw 'error_date_unknowvalue';

        let len1 = arrValues[0].length;
        let len2 = arrValues[1].length;
        if (isNaN(arrValues[0]))
            throw 'error_date_unknowvalue';
        if (len2 < 3 && isNaN(arrValues[1]))
            throw 'error_month_unknowvalue';
        if (len1 > 2)
            throw 'error_month_unknowvalue';
        let indArr1Space = arrValues[0].indexOf(" ");
        if (indArr1Space != -1)
            throw 'error_month_unknowvalue';
        let format1 = "DD"; // YYYYMMDD
        let format3 = ""; 
        let format4 = ""; 
        if (len1 == 1)
            format1 = "D";
        let format2 = "MM";
        if (len2 == 1)
            format2 = "M";
        else
        {
            let possiblemonth = arrValues[1];
            let indSpace = possiblemonth.indexOf(" ");
            if (indSpace == -1)
                throw 'error_month_datelength_withseparator';
            let arrpossiblemonth = possiblemonth.split(" ");
            let arrlen2 = arrpossiblemonth.length;
            if (arrlen2 == 0)
                throw 'error_month_unknowvalue';
            else
            if (arrlen2 == 1)
                throw 'error_month_unknowvalue';
            let month = arrpossiblemonth[0];
            let monthlen = month.length;
            if (monthlen != 1 && monthlen != 2)
                throw 'error_month_unknowvalue';
            if (isNaN(month))
                throw 'error_month_unknowvalue';
            if (monthlen == 1)
                format2 = "M";
            let time = arrpossiblemonth[1];
            let timelen = time.length;
            if (timelen < 3 || timelen > 5)
                throw 'error_time_unknowvalue';
            format4 = StaticFunctions.getHourMinFormat(time);
        }
        if (arrlen == 3)
        {
            let len3 = arrValues[2].length;
            format3 = ".YY"; 
            if (len3 != 2 && len3 != 4)
                throw 'error_yearlength_withseparator';
            else
            if (len3 == 4)
                format3 = ".YYYY"; 
        }

        return format1 +"." +format1 +format3 +format4;
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
    let indPossibleHourMinTimeWithColon = momenttime.indexOf(":");
    let indSpace = momenttime.indexOf(" ");
    let iLen = momenttime.length;
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
        throw 'error_time_unknowvalue';
    }
    else
    {
        let arrtime = momenttime.split(":");
        let arrlen = arrtime.length;
        if (arrlen != 2)
            throw 'error_time_unknowvalue';
        let hour = arrtime[0];
        let hourlen = hour.length;
        if (hourlen < 1 || hourlen > 2)
            throw 'error_time_unknowvalue';
        let formatHour = "hh";
        if (hourlen == 1)
            formatHour = "h"
        let min = arrtime[1];
        let minlen = min.length;
        if (minlen < 1 || minlen > 2)
            throw 'error_time_unknowvalue';
        let formatMin = "mm";
        if (minlen == 1)
            formatMin = "m";
        return formatHour +":" +formatMin;
    }
    throw 'error_time_unknowvalue';
}

static getMomentFormat(momenttime)
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
        {   // should be almost data:
            return StaticFunctions.getHourMinFormat(momenttime);
        }
        throw 'error_unknowvalue_withseparator';
    }
    else
    {   // should be almost data:
        return StaticFunctions.getDateFormat(momenttime);
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
        dateObj = moment(hours, format).toDate();;
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