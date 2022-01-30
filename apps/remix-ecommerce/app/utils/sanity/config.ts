import sanityConfig from "../../../../studio/sanity.json";

export const config = {
  apiVersion: "2021-03-25",
  // Find these in your ./studio/sanity.json file
  dataset: "production",
  projectId: sanityConfig.api.projectId,
  useCdn: false,
};
