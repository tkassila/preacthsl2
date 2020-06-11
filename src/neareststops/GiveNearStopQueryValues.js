import React, { Component, h, createRef }  from 'preact';
// import Button from 'preact-material-components/Button';
import Config from '../util/Config';
import StaticFunctions from '../util/StaticFunctions';
import moment from 'moment';

/**
 * This class is given address and distance inputs from user before near (bus) stops.
 */
class GiveNearStopQueryValues extends Component 
{
    addressfield = createRef();
    distanceRef = createRef();
    starttimefield = createRef();
    timer = null;
 
    constructor(props) {
        super(props);
        let localAddress = (props.address != null ? props.address : '');
        let localDistance = (props.distance != null ? props.distance : '');
        if (localDistance == null || localDistance == '')
            localDistance = '800';
        this.state = {
      //      chkbox: false
                inputValue: localAddress,
                inputDistance: localDistance,
                errordistance: null,
                addresscoordinateswrong: false,
                stopstarttime: null,
                addresses: null
            }
        this.distanceRef = React.createRef()
        // this.addressRef = React.createRef()

        this.updateInput = this.updateInput.bind(this);
        this.focusInput = this.updateInput.bind(this);
        this.focusStarttime = this.focusStarttime.bind(this);     
        this.updateStarttime = this.updateStarttime.bind(this);                
        this.updateDistance = this.updateDistance.bind(this);
        this.searchaddressss = this.searchaddressss.bind(this);
        this.stopAddresssSelected = this.stopAddresssSelected.bind(this);
        this.calledtestbutton = this.calledtestbutton.bind(this);
    }

    componentDidMount(){
//        this.addressfield.focus()
        this.addressfield.current.focus();
     }
     
     
     /*
     componentDidUpdate(){
        //        this.addressfield.focus()
          //  if (this.state.)
            //    this.divFocus.current.focus();
     }
     */

    componentWillReceiveProps(nextProps) 
    {
        let localAddress = (nextProps.address != null ? nextProps.address : '');
        let localDistance = (nextProps.distance != null ? nextProps.distance : '');
        if (localDistance == null || localDistance == '')
            localDistance = '800';

       if (Config.bDebug)
            console.log("componentWillReceiveProps");
       if (Config.bDebug)
            console.log("this.state");
       if (Config.bDebug)
            console.log(this.state);
       if (Config.bDebug)
            console.log("nextProps");
       if (Config.bDebug)
            console.log(nextProps);

        if (nextProps.addresscoordinateswrong )
        {
            this.setState({errordistance: StaticFunctions.getErrorMsg("Osoite tuntematon. Ei leveys ja pituusosoitekoordinaatteja haun jälkeen.")});
            /*
            this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.addressfield.current.focus();
                    clearTimeout(this.timer);
             }, 4000); 
             */
        }

        this.setState({
      //      chkbox: false
            inputValue: localAddress,
            inputDistance: localDistance,
            address: nextProps.address,
            addresses: nextProps.alladdresses
        });
        return true;   
    }

    updateInput(event){
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errordistance: null});
        this.setState({inputValue : value})
    }
    
    focusInput(event){
        if (Config.bDebug)
        console.log("focusInput: " +event.target.value);
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errormsg: null});
        this.setState({inputValue : value})
    }

    updateDistance(event){ // event.target.valueAsInteger || event.target.value
        let value = event.target.value;
        if (value != null && value.trim() != "")
            this.setState({errordistance: null});
        this.setState({inputDistance :  event.target.valueAsInteger || event.target.value})
    }

    isNormalInteger(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }

    /*
    getErrorMsg(msg)
    {
        if (msg == null || msg == '')
            return null;
        let ret = <div className="error"><space> </space><h3>Virhe: {msg}</h3></div>;
        return ret;
    }
    */

    clearTimeout(timer)
    {
        this.timer = null;
    }

    searchaddressss() {
        if (Config.bDebug)
            console.log("searchaddressss()");
        if (Config.bDebug)
            console.log(this.state);

        this.setState({errordistance: StaticFunctions.getErrorMsg("")});
        let inputvaluefieldvalue = this.addressfield.current.value;

        if (inputvaluefieldvalue == null ||
            inputvaluefieldvalue.toString().trim() == '' )
        {
            this.setState({errordistance: StaticFunctions.getErrorMsg("Osoite puuttuu tai on tyhjä")});
            this.timer = setTimeout(() => {
                console.log('Timeout called!');
                this.addressfield.current.focus();
                this.clearTimeout(this.timer);
            }, 4000);        
            return;
        }

        let distance = this.state.inputDistance;
        if (distance == '')
            distance = '800';
        else
        {
            let isnan = isNaN(distance);
            if (isnan)
            {
                if (Config.bDebug)
                    console.log("isnan");
                this.setState({errordistance: StaticFunctions.getErrorMsg("Pysäkkien etäisyys ei ole numero")});
                this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.distanceRef.current.focus();
                    this.clearTimeoutclearTimeout(this.timer);
                }, 4000);                        
                return;
            }        
            if (!this.isNormalInteger(distance))
            {
                console.log("!isNormalInteger(distance)");
                this.setState({errordistance: StaticFunctions.getErrorMsg("Pysäkkien etäisyys ei ole kokonaisluku")});
                this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.distanceRef.current.focus();
                    this.clearTimeout(this.timer);
                }, 4000);                        
                return;
            }
            let isgreaterthanzero = parseInt(distance) > 0;
            if (Config.bDebug)
                console.log("isgreaterthanzero" +isgreaterthanzero);
            if (!isgreaterthanzero)
            {
                if (Config.bDebug)
                    console.log("!isgreaterthanzero(distance)");
                this.setState({errordistance: StaticFunctions.getErrorMsg("Pysäkkien etäisyys: luvun oltava nollaa suurempi")});
                this.timer = setTimeout(() => {
                    console.log('Timeout called!');
                    this.distanceRef.current.focus();
                    this.clearTimeout(this.timer);
                }, 4000);                        
                return;
            }
        }

        // check that user given time or date time value is ok:

        let stopstarttime = null;
        let uncheckedStopstarttime = this.state.stopstarttime;
        if (uncheckedStopstarttime != null)
        {
            uncheckedStopstarttime = uncheckedStopstarttime.trim();
            if (uncheckedStopstarttime.length == 0)
                stopstarttime = null;
            else
            if (uncheckedStopstarttime.length != 0) // check stopstarttime that is valid
            {
                if (Config.bDebug)
                console.log("GiveNearStopQueryValues stoptimedate " +uncheckedStopstarttime);
                try 
                {
                    let format = StaticFunctions.getMomentFormatAndNumbersCheck(uncheckedStopstarttime);
                    if (Config.bDebug)
                        console.log("GiveNearStopQueryValues format" +format);

                    let timeDate = StaticFunctions.getTodayDateFromTime(uncheckedStopstarttime, format);
                    if (timeDate != null)
                    {
                        if (!timeDate instanceof Date)
                        {
                            this.setState({errordistance: StaticFunctions.getErrorMsg("Lähtöaika virhe: korjaa arvo!")});
                            return;
                        }
                        else
                        if (!timeDate.isValid())
                        {
                            this.setState({errordistance: StaticFunctions.getErrorMsg("Lähtöaika virhe: korjaa arvo!")});
                            return;
                        }

                            console.log("timeDate");
                            console.log(timeDate);

                        if (Config.bDebug)
                            console.log("GiveNearStopQueryValues StaticFunctions.getUnixSecondsFromDate()");
                        let sedonds = StaticFunctions.getUnixSecondsFromDate(timeDate);
                        if (Config.bDebug)
                            console.log("GiveNearStopQueryValues sedonds" +sedonds); 
                            stopstarttime = timeDate;
                    } 
                }
                catch(err) {        
                // document.getElementById("demo").innerHTML = err.message;
                console.log("GiveNearStopQueryValues::getNearestStopStartTime - error starttime=" +stopstarttime);
                console.log("GiveNearStopQueryValues::getNearestStopStartTime - error exception=" +err);
                console.log("GiveNearStopQueryValues::getNearestStopStartTime - not using this value!");
                this.setState({errordistance: StaticFunctions.getErrorMsg("Lähtöaika virhe: " +StaticFunctions.getStartTimeErrorMsg(err))});
                this.timer = setTimeout(() => {
                    console.log('starttimefield called!');
                    this.starttimefield.current.focus();
                    this.clearTimeout(this.timer);
                    }, 4000);                        
                return;
                }
            }
        } 

        let inputvalue = this.state.inputValue;   
        // get rigth input control value, if state inputvlaue has a wrong
        // search address value. That's clicked elseware earlier:
        if (inputvaluefieldvalue != null && inputvalue != null 
            && inputvaluefieldvalue !== inputvalue)
            inputvalue = inputvaluefieldvalue;
        if (inputvalue != null && inputvalue != '' &&
            distance != null && distance != '')
                this.props.addresssselected(inputvalue, distance, stopstarttime);
    }

    stopAddresssSelected() {
        this.props.stopAddresssSelected();
    }

    isNumeric(val) {
       // return Number(parseFloat(val)) === val;
       let isnan = isNaN(val);
       if (Config.bDebug)
           console.log("isnan" +isnan);
       let isinteger = Number.isInteger(parseInt(val));
       if (Config.bDebug)
           console.log("isinteger" +isinteger);
        let isFloat = parseFloat(val) > 0;
           if (Config.bDebug)
               console.log("isFloat" +isFloat);               
       let isgreaterthanzero = parseInt(val) > 0;
       if (Config.bDebug)
           console.log("isgreaterthanzero" +isgreaterthanzero);
       let ret = !isnan && !isFloat && isinteger && isgreaterthanzero;
       if (Config.bDebug)
           console.log("ret" +ret);
       return ret;        
    }

    updateStarttime(event){
        let value = event.target.value;
        if (value === undefined)
            return;
        this.setState({ errordistance: null, stopstarttime: value})
    }
    
    focusStarttime(event){
        if (Config.bDebug)
            console.log("focusStartTime: " +event.target.value);
        let value = event.target.value;
        if (value == undefined)
            return;
        // if (value != null && value.trim() != "")
           // this.setState({errormsg: null});
        this.setState({ stopstarttime: value });
    }

    testStartTime(casenumber, starttime,  expectingthrow, 
        expectingformat, isthroiomaing)
    {
        console.log("testStartTime(case: " +casenumber +" starttime=" +starttime 
                    +", expectingexception='" +expectingformat 
                    +"', expectingformat='" +expectingformat 
                    +"', isthroiomaing=" +isthroiomaing +"')");
        let format = null;
        try {
            format = StaticFunctions.getMomentFormatAndNumbersCheck(starttime);
            console.log("format =>'" +format +"'");
            if (expectingformat == format)
            {   if (starttime != null && starttime.trim().length != 0
                 && format != null)
                {                    
                    console.log("moment(" +starttime +", " +format +", true).toDate()");
                    let mdate = moment(starttime, format).toDate();
                    console.log(mdate);
                    if (mdate instanceof Date)
                    {
                        console.log("mdate.isValid()");
                        console.log(mdate.isValid());
                    }
                    
                    if (!(mdate instanceof Date) || ! mdate.isValid())
                        console.log("moment virhe!");
                }
                console.log("return => true");
                return true;
            }
            else
            {                                
                    console.log("AFTER different exp.format =>'" +expectingformat +"'");
                    console.log("AFTER different format =>'" +format +"'");
            }
            console.log("return => false");
            return false;
        }
        catch(err) {        
            if (expectingthrow == null || err != expectingthrow)
            {
                console.log("testStartTime - error starttime=" +starttime);
                console.log("testStartTime - error err='" +err +"'");
                console.log("testStartTime - error expectingformat=" +expectingformat +"'");
                console.log("testStartTime - not using this exception!");
                console.log("return => fslse");
                return false;
            }
            console.log("return => true");
            return true;
        }
        console.log("return => fslse");
        return false;
    }

    /**
     * test button function for testing startime, user input values:
     */
    calledtestbutton()
    {
        console.log("calledtestbutton start");
        console.log("");

        let casenumber = 1;
        let starttime = null;
        let expectingformat = null;
        let expectingthrow = null;
        let isthroiomaing = false;
        let testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
                                expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 2;
        starttime = "";
        expectingformat = null;
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 3;
        starttime = "    ";
        expectingformat = null;
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 4;
        starttime = " aaa   ";
        expectingformat = null;
        expectingthrow = "error_time_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 5;
        starttime = " aa:22   ";
        expectingformat = null;
        expectingthrow = "error_time_hour_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 6;
        starttime = " 1a:22   ";
        expectingformat = null;
        expectingthrow = "error_time_hour_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 7;
        starttime = " 11:a2   ";
        expectingformat = null;
        expectingthrow = "error_time_min_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 8;
        starttime = " 11:32a   ";
        expectingformat = null;
        expectingthrow = "error_time_min_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 9;
        starttime = " 11:322   ";
        expectingformat = null;
        expectingthrow = "error_time_min_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 10;
        starttime = " 111:22   ";
        expectingformat = null;
        expectingthrow = "error_time_hour_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 11;
        starttime = " :   ";
        expectingformat = null;
        expectingthrow = "error_time_hour_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 12;
        starttime = " :dd   ";
        expectingformat = null;
        expectingthrow = "error_time_hour_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 13;
        starttime = "01:22   ";
        expectingformat = "hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 14;
        starttime = "0:22   ";
        expectingformat = "h:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 15;
        starttime = "01:2   ";
        expectingformat = null;
        expectingthrow = "error_time_min_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 16;
        starttime = "01:a2   ";
        expectingformat = null;
        expectingthrow = "error_time_min_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 17;
        starttime = " 4.3.   ";
        expectingformat = "D.M";
        expectingthrow = null;
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 18;
        starttime = " 4.3   ";
        expectingformat = "D.M";
        expectingthrow = null;
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 19;
        starttime = " 4.3.1   ";
        expectingformat = "D.M.Y";
        expectingthrow = null;
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 20;
        starttime = " 30.03.2030   ";
        expectingformat = "DD.MM.YYYY";
        expectingthrow = null;
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 21;
        starttime = " 40.30.30   ";
        expectingformat = "DD.MM.YY";
        expectingthrow = null;
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 22;
        starttime = " 40.30.2030   ";
        expectingformat = "DD.MM.YYYY";
        expectingthrow = null;
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 23;
        starttime = " a20.30.2030   ";
        expectingformat = null;
        expectingthrow = "error_day_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 24;
        starttime = " 20.a30.2030   ";
        expectingformat = null;
        expectingthrow = "error_month_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 25;
        starttime = " 20.30.a2030   ";
        expectingformat = null;
        expectingthrow = "error_year_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 26;
        starttime = " 20.30.22030   ";
        expectingformat = null;
        expectingthrow = "error_year_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 27;
        starttime = " 20.230.22030   ";
        expectingformat = null;
        expectingthrow = "error_month_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 28;
        starttime = " 120.230.22030   ";
        expectingformat = null;
        expectingthrow = "error_day_wrong";
        isthroiomaing = true;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 29;
        starttime = " 20.20.2030 20:15 ";
        expectingformat = "DD.MM.YYYY hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 30;
        starttime = " 20.20.20 20:15 ";
        expectingformat = "DD.MM.YY hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 31;
        starttime = " 20.20.2 20:15 ";
        expectingformat = "DD.MM.Y hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        casenumber = 32;
        starttime = " 2.2.2 21:50 ";
        expectingformat = "D.M.Y hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");

        
        casenumber = 33;
        starttime = "24:50 ";
        expectingformat = "hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");
        
        casenumber = 34;
        starttime = " 2.2.2 24:50 ";
        expectingformat = "D.M.Y hh:mm";
        expectingthrow = null;
        isthroiomaing = false;
        testStartTimeReturned = null;

        testStartTimeReturned = this.testStartTime(casenumber, starttime, 
            expectingthrow, expectingformat, isthroiomaing);
        console.log("testStartTimeReturned = " +testStartTimeReturned);
        console.log("");
    }

     //  <label htmlFor="address">Anna osoite:</label><br/>
             
    render(props, state) { // placeholder="Anna pysäkkien maksimi etäisyys.." 
        if (Config.bDebug)
            console.log("errordistance" +state.errordistance);

        let testbuttonforstarttime = null;
        if (Config.bTestButton)
        {
            console.log("Config.bTestButton");
            testbuttonforstarttime = 
              <button onClick={this.calledtestbutton} aria-label="Test button" >
            Testipainonappi lähtöaikojen testaukseen
            </button>;
        }

        return (             
            <div data-message="Anna haettavien pysäkkien lähiosoite">
            {testbuttonforstarttime}
                            <div onChange={props.selectedDataSource} 
            data-message="Tietoja luetaan järjestelmästä valinta">
              <fieldset>
                <legend>Mistä tietoja haetaan:</legend>
                  <div>
                  <input type="radio" id="hsl" value="HSL" checked={true} 
                 name="datasource" /><label for="hsl">HSL</label>
                <input type="radio" id="finland" value="FINLAND" 
                name="datasource" /><label for="finland">FINLAND</label>
                <input type="radio" id="waltti" value="WALTTI" 
                name="datasource" /><label for="waltti">WALTTI</label>
                </div>
              </fieldset>
            </div>

            <h3>Lähisoite pysäkeille:</h3>
                <label htmlFor="address">Anna lähin osoite lähellä sijaitseville pysäkeille (paikkakunta viimeisenä, isoalkukirjain):</label><br/>
                <input type="text" id="address" name="address" placeholder="Kirjoita haettava osoite.." 
                    maxlength="200" size="70" onChange={this.updateInput}
                    onFocus={this.focusInput} 
                    defaultValue={this.state.inputValue || ''}
                    ref={this.addressfield} /><br/><br/>
                <label htmlFor="startime">Anna kelloaika lähtöajalle (tunti tai tt:mm tai pp.kk.yyyy jne):</label><br/>
                <input type="text" id="starttime" name="starttime" placeholder="Kirjoita lähtöaika tai jätä tyhjäksi.." 
                    maxlength="20" size="70" onChange={this.updateStarttime}
                    onFocus={this.focusStarttime} 
                    defaultValue={this.state.starttime || ''}
                    ref={this.starttimefield} /><br/><br/>
                <label htmlFor="distance">Anna pysäkkien maksimi etäisyys metreissä:</label><br/>
                <input type="text" id="distance" name="distance"                     
                    maxlength="70" size="70" onChange={this.updateDistance} 
                    defaultValue={this.state.inputDistance}
                    ref={this.distanceRef}/>
                    <div id="errordistance1" aria-live="polite">{state.errordistance}</div>
                    <br/><br/>
                <button onClick={this.searchaddressss} aria-label="Hae pysäkkejä" >

                    Hae pysäkkejä

                </button>
                &nbsp;&nbsp;
                <button role="button" disabled={props.disableCancelButton} 
                aria-label="Keskeytä haku"
                onClick={this.stopAddresssSelected} >
                    
                    Keskeytä haku
                    
                </button>
             </div>
        );
    }
}

export default GiveNearStopQueryValues;
