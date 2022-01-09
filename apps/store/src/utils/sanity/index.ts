import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createCurrentUserHook, createImageUrlBuilder, createPortableTextComponent } from "next-sanity";

import { config } from "./config";

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  // serializers,
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
