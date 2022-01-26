import * as React from "react";

interface FeaturedSectionProps {
  backgroundImage: {
    src: string;
    altText?: string;
  };
  cta: string;
  description: string;
  heading: string | Array<string>;
  href: string;
  id: string;
}

export function FeaturedSection({
  backgroundImage,
  cta,
  description,
  heading,
  href,
  id,
}: FeaturedSectionProps): JSX.Element {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundImage?.src}
            alt={backgroundImage?.altText ?? ""}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:py-40 sm:px-12 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 id={id} className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {typeof heading === "string"
                ? heading
                : heading.map((line, index) => (
                    <React.Fragment key={index}>
                      <span className="block sm:inline">{line}</span>
                      {index !== heading.length - 1 ? " " : null}
                    </React.Fragment>
                  ))}
            </h2>
            <p className="mt-3 text-xl text-white">{description}</p>
            <a
              href={href}
              className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
