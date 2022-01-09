import { groq } from "next-sanity";

export const allPagesQuery = groq`
  *[_type == "page" && !(_id in path("drafts.**"))]{
    slug,
  }
`;

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug]{
    title,
    slug,
    description,
    shareImage,
    content
  }[0]
`;
