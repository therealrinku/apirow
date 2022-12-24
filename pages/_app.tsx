import "../styles/globals.css";

import type { AppProps } from "next/app";

import { Scrollbars } from "react-custom-scrollbars";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Scrollbars style={{ height: "100vh" }}>
      <Component {...pageProps} />
    </Scrollbars>
  );
}

export default MyApp;
