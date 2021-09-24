import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../components/layout';
import type { LayoutProps } from '../types';
import { useApollo } from '../utils/apollo-client';
import { VENDOR_NAME } from '../utils/constants';
interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & LayoutProps;
}

export default function App({
  Component,
  pageProps,
}: CustomAppProps): JSX.Element {
  const AppLayout = Component.layoutProps?.Layout || Layout;
  const title = Component.layoutProps?.meta?.title || VENDOR_NAME;
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AppLayout>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppLayout>
    </>
  );
}
