import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(context);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en-AU">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
