// Must be the first import
// Must be the first import
if (process.env.NODE_ENV==='development') {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require("preact/debug");
}

// import React from 'preact/compat';
//import ReactDOM from 'react-dom';
import { render } from 'preact';
// import ApolloClient from 'apollo-boost';
//import { GraphQL, Provider } from 'graphql-react'
// import { Query } from 'graphql-react'
// import { ApolloProvider } from 'react-apollo';
import Introspection from './Introspection';
import './index.css';
import App from './App';

import { options } from 'preact';

// Turn off async setState entirely:
options.debounceRendering = f => f()

// Use setTimeout(0) for async:
options.debounceRendering = setTimeout

// import * as serviceWorker from './serviceWorker';

// import { gql } from 'apollo-boost';
// import { Query } from 'react-apollo';

/*
const GET_DOG = gql`
query {
  stopsByRadius(lat:60.201706,lon:24.918506,radius:500) 
  {
    edges
    {
      node 
      {
        stop 
        { 
          gtfsId 
          name
        }
        distance
      }
    }
  }
}
`;
 */

/*
  const App2 = () => (
    <Query query={GET_DOG}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
  
        return (
          <p>breed={data}</p> 
        )
      }}
    </Query>
  )
*/

/*
const client = new ApolloClient({
  // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
  // uri: "https://api.webpack.wtf"
  url: "https://api.digitransit.fi/graphql/hsl"
});
*/

const theme = {
  global: {
    colors: {
       brand: '#228BE6',
     },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

// const client = new ApolloClient({ uri: 'https://api.digitransit.fi/graphql/hsl' });

/*
const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
*/

//ReactDOM.render(App, document.getElementById('root'));
// ReactDOM.render(App, document.getElementById('app'));
export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
