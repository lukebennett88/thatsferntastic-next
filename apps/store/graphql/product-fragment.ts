import { gql } from '@ts-gql/tag';

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
          id
          altText
          height
          width
          transformedSrc
        }
      }
    }
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    title
    variants(first: 250) {
      edges {
        node {
          id
          availableForSale
          image {
            id
            altText
            height
            width
            transformedSrc
          }
          priceV2 {
            amount
          }
          quantityAvailable
          selectedOptions {
            name
            value
          }
          title
        }
      }
    }
  }
` as import('../../../__generated__/ts-gql/Product_Fragment').type;
