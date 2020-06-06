import { Component } from 'preact';
import style from './style';
import styleDark from './styleDark';

class HeaderCss extends Component {

   static bCssDark = false;
   cssstyle = null;
   cssstyleDark = null;

   static staticCss = style;
   static staticCssDark = styleDark;

    constructor(props)
    {
      super(props);
      this.state = { 
	  }
	  this.cssstyle = style;
	  this.cssstyleDark = styleDark;
	}
	
	cssStyle()
	{
		return cssstyle;
	}

	cssStyleDark()
	{
		return cssstyleDark;
	}

    render() {
      return (
        <div>
        </div>  
      );} 
  }

  export default HeaderCss;
