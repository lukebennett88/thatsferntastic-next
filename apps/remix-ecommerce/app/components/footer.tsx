import type { To } from "react-router-dom";
import { Link } from "remix";

import { GithubIcon } from "./icons";
import { OptimizedImage } from "./optimized-image";

export type FooterPage = {
  id: string;
  title: string;
  to: To;
};

export function Footer({ logoHref, pages, storeName }: { logoHref: string; pages: FooterPage[]; storeName?: string }) {
  return (
    <footer>
      <div className="border-t border-zinc-700 px-4 py-16 lg:flex lg:px-6">
        <div className="mb-6 lg:mr-20">
          <div className="flex flex-1 items-center">
            <img className="h-10 w-10" src={logoHref} alt="" width={40} height={40} />
            {storeName ? <h1 className="ml-4 text-lg font-semibold">{storeName}</h1> : null}
          </div>
        </div>
        <ul className="mb-6 mr-auto grid max-w-lg flex-1 gap-4 md:grid-flow-col md:grid-rows-4">
          {pages.map((page) => (
            <li key={page.id}>
              <Link className="hover:text-gray-300 focus:text-gray-300" prefetch="intent" to={page.to}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div className="flex items-center">
            <a
              className="mr-4 inline-block hover:text-gray-300 focus:text-gray-300"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">View source</span>
              <GithubIcon className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-700 px-4 py-8 lg:px-6">
        <p className="text-sm text-gray-300">© 2022 {storeName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
