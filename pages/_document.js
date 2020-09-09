import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import GoogleFonts from 'next-google-fonts';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <GoogleFonts
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <Head>
          <meta charset="utf-8" />
          <meta content="##9F7AEA" name="theme-color" />
          <meta content="##9F7AEA" name="msapplication-TileColor" />
          {/* TODO: Add Google Site Verification Later */}
          {/* <meta
            content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
            name="google-site-verification"
          /> */}
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta
            name="robots"
            content="index,follow,max-video-preview:-1,max-snippet:-1,max-image-preview:large, max-video-preview:-1, max-video-preview:-1"
          />
          <meta
            name="googlebot"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta
            name="bingbot"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-143759180-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-143759180-1');
        `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
