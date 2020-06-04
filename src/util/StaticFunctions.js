import { Component  } from 'preact';

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
                    return typevalue;

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
                    return mode;
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

    static getRoundedMeterDistance(distance)
    {
        if (isNaN(distance))
            return distance;
        return Math.ceil(distance);
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
    let dateObj = new Date(unixTimestamp); 
    return dateObj;
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
   return value.replace(/\s{2,}/i, ' ').trim();
}

}


export default StaticFunctions;