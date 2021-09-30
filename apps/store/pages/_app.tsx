import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { Layout } from '../components/layout';
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
      <AppLayout>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppLayout>
    </>
  );
}
