import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components/layout';
import { StoreProvider } from '../context/store-context';
import type { LayoutProps } from '../types';
import { useApollo } from '../utils/apollo-client';
import { siteSettings } from '../utils/constants';

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & LayoutProps;
}

export default function App({
  Component,
  pageProps,
}: CustomAppProps): JSX.Element {
  const AppLayout = Component.layoutProps?.Layout || Layout;
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <DefaultSeo {...siteSettings} />
      <ApolloProvider client={apolloClient}>
        <StoreProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </StoreProvider>
      </ApolloProvider>
      <Toaster />
    </>
  );
}
