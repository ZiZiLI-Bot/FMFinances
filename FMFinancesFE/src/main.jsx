import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import configureStore from './helper/Redux';
import theme from './helper/Theme';
import router from './router';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <ChakraProvider resetCSS theme={theme}>
        <RouterProvider router={router}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </RouterProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
