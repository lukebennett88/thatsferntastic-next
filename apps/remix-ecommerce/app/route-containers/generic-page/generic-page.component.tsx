import { useLoaderData } from "remix";

import { defaultMeta } from "~/utils/default-meta";

import type { LoaderData } from "./generic-page.server";

export const meta = ({ data }: { data?: LoaderData }) => {
  return data?.page?.title
    ? {
        title: data.page.title,
        description: data.page.summary,
      }
    : defaultMeta;
};

export default function GenericPage() {
  let {
    page: { body },
  } = useLoaderData<LoaderData>();
  return (
    <div className="py-16">
      <div
        className="prose prose-invert mx-auto max-w-xl px-4 text-gray-50"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
