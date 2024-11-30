import React from 'react';
import { GlobalStateProvider } from '../contexts/globalState'; 
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

export default MyApp;
