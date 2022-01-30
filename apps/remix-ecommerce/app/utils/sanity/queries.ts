export const allPagesQuery = `
  *[_type == "page" && !(_id in path("drafts.**"))]{
    _id,
    title,
    slug,
  }
  `;

export const pageQuery = `
  *[_type == "page" && slug.current == $slug]{
    _id,
    title,
    slug,
    description,
    shareImage,
    content
  }[0]
`;
