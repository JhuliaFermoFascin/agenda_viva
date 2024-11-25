import React from 'react';
import { GlobalStateProvider } from '../contexts/globalState'; 

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

export default MyApp;
