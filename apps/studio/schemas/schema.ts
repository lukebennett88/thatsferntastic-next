// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
// @ts-expect-error: Cannot find module 'all:part:@sanity/base/schema-type' or its corresponding type declarations.
import schemaTypes from "all:part:@sanity/base/schema-type";
// @ts-expect-error: Cannot find module 'all:part:@sanity/base/schema-type' or its corresponding type declarations.
import createSchema from "part:@sanity/base/schema-creator";

import { blockContent } from "./arrays/block-content";
// import document schemas
import { blogPost } from "./documents/blog-post";
import { page } from "./documents/page";
import { siteSettings } from "./documents/site-settings";
// import object schemas
import { imageWithAltText } from "./images/image-with-alt-text";
import { richText } from "./objects/rich-text";
import { socialLinks } from "./objects/social-links";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    imageWithAltText,
    blockContent,
    socialLinks,
    richText,
    // The following are document types which will appear
    // in the studio.
    blogPost,
    page,
    siteSettings,
  ]),
});
