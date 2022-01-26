import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";

import { Page } from "../types/sanity-schema";
import { PortableText, urlFor } from "../utils/sanity";
import { allPagesQuery, pageQuery } from "../utils/sanity/queries";
import { sanityClient } from "../utils/sanity/sanity.server";

export const getStaticPaths: GetStaticPaths = async () => {
  const allSanityPageSlugs: Array<Pick<Page, "slug">> = await sanityClient.fetch(allPagesQuery);
  return {
    paths: (allSanityPageSlugs ?? []).map(({ slug }) => ({
      params: {
        slug: slug?.current,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ sanityPage: Page }> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }
  const sanityPage = await sanityClient.fetch<Page>(pageQuery, { slug });

  return {
    props: {
      sanityPage,
    },
    revalidate: 200,
  };
};

export default function SanityPage({ sanityPage }: InferGetStaticPropsType<typeof getStaticProps>) {
  const shareImage = sanityPage.shareImage ? urlFor(sanityPage.shareImage).url() : undefined;
  return (
    <>
      <NextSeo
        title={sanityPage.title}
        description={
          typeof sanityPage.description === "string" ? sanityPage.description.replace(/["“]/g, "'") : undefined
        }
        openGraph={{ ...(shareImage ? { images: [{ url: shareImage }] } : {}) }}
      />
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="prose mx-auto py-24">
          <h1>{sanityPage.title}</h1>
          {sanityPage.content?.map((content) => {
            if (content._type !== "richText" || !content.blockContent) return null;
            return <PortableText key={content._key} blocks={content.blockContent} />;
          })}
        </div>
      </main>
    </>
  );
}
