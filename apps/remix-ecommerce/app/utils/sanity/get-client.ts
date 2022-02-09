import type { PicoSanity } from "picosanity";
import SanityClient from "picosanity";

import { config } from "./config";

// Standard client for fetching data
export const sanityClient: PicoSanity = new SanityClient(config);

// Authenticated client for fetching draft documents
export const previewClient: PicoSanity = new SanityClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN ?? "",
});

// Helper function to choose the correct client
export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient);
