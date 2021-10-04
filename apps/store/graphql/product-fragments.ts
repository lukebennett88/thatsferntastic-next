import { gql } from '@ts-gql/tag';

export const IMAGE_FRAGMENT = gql`
  fragment Image_Fragment on Image {
    id
    altText
    height
    width
    transformedSrc
  }
` as import('../../../__generated__/ts-gql/Image_Fragment').type;

export const PRODUCT_OPTION_FRAGMENT = gql`
  fragment ProductOption_Fragment on ProductOption {
    id
    name
    values
  }
` as import('../../../__generated__/ts-gql/ProductOption_Fragment').type;

export const PRODUCT_PRICE_RANGE_FRAGMENT = gql`
  fragment ProductPriceRange_Fragment on ProductPriceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
` as import('../../../__generated__/ts-gql/ProductPriceRange_Fragment').type;

export const PRODUCT_VARIANT_EDGE_FRAGMENT = gql`
  fragment ProductVariantEdge_Fragment on ProductVariantEdge {
    node {
      id
      availableForSale
      image {
        ...Image_Fragment
      }
      priceV2 {
        ...MoneyV2_Fragment
      }
      quantityAvailable
      selectedOptions {
        ...SelectedOption_Fragment
      }
      title
    }
  }
` as import('../../../__generated__/ts-gql/ProductVariantEdge_Fragment').type;

export const SELECTED_OPTION_FRAGMENT = gql`
  fragment SelectedOption_Fragment on SelectedOption {
    name
    value
  }
` as import('../../../__generated__/ts-gql/SelectedOption_Fragment').type;

export const MONEY_V2_FRAGMENT = gql`
  fragment MoneyV2_Fragment on MoneyV2 {
    amount
    currencyCode
  }
` as import('../../../__generated__/ts-gql/MoneyV2_Fragment').type;

export const PRODUCT_FRAGMENT = gql`
  fragment Product_Fragment on Product {
    id
    availableForSale
    description
    descriptionHtml
    handle
    images(first: 6) {
      edges {
        node {
          ...Image_Fragment
        }
      }
    }
    options {
      ...ProductOption_Fragment
    }
    priceRange {
      ...ProductPriceRange_Fragment
    }
    title
    variants(first: 250) {
      edges {
        ...ProductVariantEdge_Fragment
      }
    }
  }
` as import('../../../__generated__/ts-gql/Product_Fragment').type;
