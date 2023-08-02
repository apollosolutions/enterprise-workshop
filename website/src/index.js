import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// ----- Import Apollo Client Here ----
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
// ------------------------------------


import theme from './theme.js';
import {ChakraProvider} from '@chakra-ui/react';


// ----- Configure the apollo client here ------
const client = new ApolloClient({
  uri: 'https://router-j3nprurqka-ue.a.run.app/',
  cache: new InMemoryCache(),
  name: 'web-workshop-client',
  version: '0.1'
});
// ---------------------------------------------

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
