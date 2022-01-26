import cn from "classnames";
import type { ReactNode } from "react";
import type { To } from "react-router-dom";
import { Link } from "remix";

export function CtaBanner({
  ctaText,
  ctaTo,
  description,
  headline,
  variant = "primary",
}: {
  ctaText: ReactNode;
  ctaTo: To;
  description: ReactNode;
  headline: ReactNode;
  variant: "primary" | "secondary";
}) {
  return (
    <article
      className={cn(
        "px-4 py-24 lg:flex lg:px-6 lg:py-32",
        variant === "secondary" && "border-t border-zinc-700 bg-gray-50 text-zinc-900",
      )}
    >
      <h1 className="max-w-lg text-6xl font-bold lg:text-right">{headline}</h1>
      <div className="mt-3 flex-1 lg:ml-8">
        <p className="mb-4 text-xl font-light">{description}</p>
        <p>
          <Link className="group inline-flex items-center" prefetch="intent" to={ctaTo}>
            <span className="text-xl font-semibold hover:underline focus:underline group-hover:underline group-focus:underline">
              {ctaText}
            </span>
            <svg
              className="h-6 w-6 motion-safe:group-hover:animate-pulse motion-safe:group-focus:animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </p>
      </div>
    </article>
  );
}
