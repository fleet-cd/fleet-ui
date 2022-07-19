import type { AppProps } from "next/app";
import Page from "../layout/Page/Page";
import { closeSnackbar, SnackbarProvider } from "notistack";
import Button from "../components/Button/Button";

import "../styles/globals.scss";
import "react-loading-skeleton/dist/skeleton.css";
// import 'primereact/resources/themes/lara-light-indigo/theme.css';  //theme
import "primereact/resources/primereact.min.css";                  //core css
// import 'primeicons/primeicons.css';                                //icons

import { setConfiguration } from "react-grid-system";
import { Color, Variant } from "../components/types/types";

setConfiguration({ maxScreenClass: "xl" });

function MyApp({ Component, pageProps }: AppProps) {
  return <SnackbarProvider maxSnack={3} action={(snackbarId) => (
    <Button color={Color.WHITE} variant={Variant.TEXT} onClick={() => closeSnackbar(snackbarId)}>
      Dismiss
    </Button>
  )}>
    <Page>
      <div style={{ minHeight: "calc(100vh - 68px)" }}>
        <Component {...pageProps} />
      </div>
    </Page>
  </SnackbarProvider>;
}

export default MyApp;
