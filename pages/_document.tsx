import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-1DCXH67REC"
          />
          <meta
            name="google-site-verification"
            content="BlhM7OZK3iFMnl_A9SHnJYYDhv96F6NcGpAOOep9ivw"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1DCXH67REC', {
                page_path: window.location.pathname,
              });
            `,
            }}
          /> */}

          {/* google adsense */}
          {/* <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "6168893131645619",
                   enable_page_level_ads: true
              });
                `,
            }}
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
            rel="stylesheet"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
