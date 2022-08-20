import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

import "../styles/globals.css";

import * as ga from "../lib/ga";
import { useEffect } from "react";
import Notification from "../components/Notification";

nProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     ga.pageview(url);
  //   };
  //   //When the component is mounted, subscribe to router changes
  //   //and log those page views
  //   Router.events.on("routeChangeComplete", handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method
  //   return () => {
  //     Router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [Router.events]);

  return (
    <SessionProvider session={session}>
      <Notification />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
