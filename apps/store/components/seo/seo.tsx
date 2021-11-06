import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { siteSettings } from '../../utils/constants';

export function Seo() {
  return (
    <>
      <NextHead>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </NextHead>
      <DefaultSeo {...siteSettings} />
    </>
  );
}
