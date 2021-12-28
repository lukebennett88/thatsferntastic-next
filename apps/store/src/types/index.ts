import type { NextPage } from "next";

export interface LayoutProps {
  layoutProps?: {
    meta?: {
      title?: string;
    };
    Layout: React.FC;
  };
}

export type NextPageWithLayoutProps = NextPage & LayoutProps;

export type AnyObject = Record<string, any>;
