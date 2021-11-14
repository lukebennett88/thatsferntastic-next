import type { NextPage } from 'next';

export interface LayoutProps {
  layoutProps?: {
    meta?: {
      title?: string;
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    Layout: React.FC;
  };
}

export type NextPageWithLayoutProps = NextPage & LayoutProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;
