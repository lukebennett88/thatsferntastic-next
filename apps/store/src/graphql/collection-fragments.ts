import { gql } from "@ts-gql/tag/no-transform";

export const COLLECTION_FRAGMENT = gql`
  fragment Collection_Fragment on Collection {
    id
    description
    descriptionHtml
    handle
    image {
      id
      altText
      transformedSrc
    }
    title
  }
` as import("../../../__generated__/ts-gql/Collection_Fragment").type;
