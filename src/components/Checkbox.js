
import React, { Component } from 'preact';

import Config from '../util/Config';

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
    const { label } = this.props;
    const { isChecked } = this.state;
    
    return (
      <div className="checkbox" data-message="radionappi">
        <label>
          <input
                            type="checkbox"
                            value={label}
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                            aria-label={label}
                        />

          {label}
        </label>
      </div>
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
