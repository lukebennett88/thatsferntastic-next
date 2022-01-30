import SanityPortableText from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import type { BlockContent } from "../../../types/sanity-schema";
import { config } from "./config";

export const urlFor = (source: SanityImageSource) => imageUrlBuilder(config).image(source);

export function PortableText({ blocks = [] }: { blocks: BlockContent }) {
  return <SanityPortableText serializers={{}} {...config} blocks={blocks} />;
}
