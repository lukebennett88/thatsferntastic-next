import type { NextPage } from 'next';

export interface LayoutProps {
  layoutProps?: {
    meta?: {
      title?: string;
    };
    Layout: React.FC;
  };
}

export type NextPageWithLayoutProps = NextPage & LayoutProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

// The ShopifyBuy types are wrong, this is just a placeholder I made from a JSON file
export interface LineItem {
  id: string;
  title: string;
  variant: {
    id: string;
    title: string;
    price: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    presentmentPrices: Array<{
      price: {
        amount: string;
        currencyCode: string;
      };
      compareAtPrice: null;
      hasNextPage: {
        value: boolean;
      };
      hasPreviousPage: boolean;
      variableValues: {
        checkoutId: string;
        lineItems: Array<{
          variantId: string;
          quantity: number;
        }>;
      };
    }>;
    weight: number;
    available: boolean;
    sku: string;
    compareAtPrice: null;
    compareAtPriceV2: null;
    image: {
      id: string;
      src: string;
      altText: null;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    unitPrice: null;
    unitPriceMeasurement: {
      measuredType: null;
      quantityUnit: null;
      quantityValue: number;
      referenceUnit: null;
      referenceValue: number;
    };
    product: {
      id: string;
      handle: string;
    };
  };
  quantity: number;
  customAttributes: [];
  discountAllocations: [];
  hasNextPage: {
    value: boolean;
  };
  hasPreviousPage: boolean;
  variableValues: {
    checkoutId: string;
    lineItems: Array<{
      variantId: string;
      quantity: number;
    }>;
  };
}
