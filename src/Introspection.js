// import React from 'react'
import Preact, { Component } from 'preact';

class Introspection extends Component {
  render() {
    return <div>
      {
        process.env.NODE_ENV === 'development' ?
        <p>Currently using React { Preact.version }</p> : null
      }
    </div>
  }
}

export default Introspection;