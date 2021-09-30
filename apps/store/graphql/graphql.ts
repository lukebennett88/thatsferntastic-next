import { gql } from '@ts-gql/tag';

export const PRODUCT_QUERY = gql`
  query ProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      id
      availableForSale
      description
      descriptionHtml
      images(first: 1) {
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
      priceRange {
        minVariantPrice {
          amount
        }
      }
      title
    }
  }
` as import('../../../__generated__/ts-gql/ProductQuery').type;

export const GET_ALL_PRODUCT_VENDORS = gql`
  query getAllProductVendors($first: Int = 250, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          vendor
        }
        cursor
      }
    }
  }
` as import('../../../__generated__/ts-gql/getAllProductVendors').type;

export type Product =
  typeof PRODUCT_QUERY['___type']['result']['productByHandle'];
