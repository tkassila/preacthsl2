
import React, { Component, Fragment } from 'preact';

import Config from '../util/Config';

/**
 * This Checkbox class is a checkbox component of the app.
 */
class Checkbox extends Component {
  state = {
    isChecked: false,
    forcevalue: false
  }

  componentWillReceiveProps(nextProps) 
  {
    if (nextProps.forcevalue == true)
    {
      if (Config.bDebug)
        console.log("forcevalue: " +nextProps.forcevalue)
      this.setState({isChecked: false, forcevalue: true});
    }     
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, id } = this.props;
    let isChecked = this.state.isChecked;
    
    if (this.state.forcevalue)
       return; 
    this.setState({ isChecked: !isChecked })
    handleCheckboxChange(id, label, !isChecked);
  }

  render() {
    const strlabel = this.props.label;
    const { isChecked } = this.state;
    let id = "checkbox_id_" +this.props.checkboxid;
    return (
      <Fragment>
            <input id={id} tabIndex="0" name={id}
                            type="checkbox"
                            value={strlabel}
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                            aria-label={strlabel}
                        />
          <space>    </space>
          <label htmlFor={id} > 
          
          {strlabel} 
          
          </label>
      </Fragment>
    );
  }
}

/*
Checkbox.propTypes = {
  label: PropTypes.string.isRequired
 };
 */

 /* , handleCheckboxChange: PropTypes.func.isRequired, */

export default Checkbox;
