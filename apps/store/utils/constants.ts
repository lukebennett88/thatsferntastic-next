const title = '@thatsferntastic';
const description =
  '@thatsferntastic is an online store focusing on the little things that make you smile. Pencil cases, planner pouches and coin purses, all handmade in Australia, plus accessories, stationery and stickers to add a little more sunshine to your day. Offering flat rate shipping from my little studio on the coast of NSW.';

export const siteSettings = {
  title,
  titleTemplate: `%s: pencil cases, planner pouches and coin purses, accessories, stationery and stickers to add a little more sunshine to your day.`,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.thatsferntastic.com.au',
    site_name: title,
    images: [
      {
        url: 'https://cdn.sanity.io/images/vxhsnaeh/production/5b0f778989438587159b584d5258a65c73f0217b-1800x1200.png',
        height: 1800,
        width: 1200,
      },
    ],
  },
};
