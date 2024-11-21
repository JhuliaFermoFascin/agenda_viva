import "@/styles/globals.css";
import { GlobalStateProvider } from "@/contexts/globalState.js";


export default function App({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}


