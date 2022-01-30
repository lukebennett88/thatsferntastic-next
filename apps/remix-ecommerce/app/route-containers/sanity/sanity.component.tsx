import { useLoaderData } from "remix";

import { PortableText } from "~/utils/sanity/helpers";

import type { LoaderData } from "./sanity.server";

export default function Component() {
  const { sanityPage } = useLoaderData<LoaderData>();
  return (
    <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
      <div className="prose mx-auto py-24">
        <h1>{sanityPage.title}</h1>
        {sanityPage.content?.map((content) => {
          if (content._type !== "richText" || !content.blockContent) return null;
          return <PortableText key={content._key} blocks={content.blockContent} />;
        })}
      </div>
    </main>
  );
}
