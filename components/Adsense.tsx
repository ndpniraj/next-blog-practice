import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default function Adsense() {
  const loadAds = () => {
    let byGoogle = window.adsbygoogle as any;
    try {
      if (typeof window !== "undefined") {
        (byGoogle = byGoogle || []).push({});
      }
    } catch (error: any) {
      console.log("adsense error", error.message);
    }
  };
  useEffect(() => {
    loadAds();
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6168893131645619"
      data-ad-slot="8640855501"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
