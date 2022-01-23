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
      <div className="px-4 py-16 border-t lg:flex border-zinc-700 lg:px-6">
        <div className="mb-6 lg:mr-20">
          <div className="flex items-center flex-1">
            <img className="w-10 h-10" src={logoHref} alt="" width={40} height={40} />
            {storeName ? <h1 className="ml-4 text-lg font-semibold">{storeName}</h1> : null}
          </div>
        </div>
        <ul className="grid flex-1 max-w-lg gap-4 mb-6 mr-auto md:grid-rows-4 md:grid-flow-col">
          {pages.map((page) => (
            <li key={page.id}>
              <Link className="focus:text-gray-300 hover:text-gray-300" prefetch="intent" to={page.to}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div className="flex items-center">
            <a
              className="inline-block mr-4 focus:text-gray-300 hover:text-gray-300"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">View source</span>
              <GithubIcon className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
      <div className="px-4 py-8 border-t border-zinc-700 lg:px-6">
        <p className="text-sm text-gray-300">© 2022 {storeName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
