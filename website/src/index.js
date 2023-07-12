import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// ----- Import Apollo Client Here ----


// ------------------------------------

import theme from './theme.js';
import {ChakraProvider} from '@chakra-ui/react';

// ----- Configure the apollo client here ------


// ---------------------------------------------


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
