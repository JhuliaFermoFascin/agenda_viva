import React from 'react';
import Head from 'next/head'; 
import { GlobalStateProvider } from '../contexts/globalState'; 
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Head>
        <title>Agenda Viva</title>
        <meta name="description" content="Sistema de agendamento eficiente - Agenda Viva" />
        <link rel="icon" href="/icon/logoAPAE.png" /> Atualize o caminho do ícone, se necessário
      </Head>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

export default MyApp;
