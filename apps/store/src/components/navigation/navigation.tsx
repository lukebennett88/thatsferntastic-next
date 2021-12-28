/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { DesktopMenu } from "../desktop-menu";
import { MobileMenu } from "../mobile-menu";

const bannerText = ["Free Australian shipping for order over $60", "Free Worldwide Shipping for orders over $100 AUD"];

function AnnouncementBanner(): JSX.Element {
  return (
    <p className="px-4 py-1 text-sm font-medium text-center text-teal-900 bg-teal-50 sm:px-6 lg:px-8">
      {bannerText.map((line, index) => (
        <React.Fragment key={index}>
          <span className="block lg:inline-block">{line}</span>
          {index !== bannerText.length - 1 ? (
            <span aria-hidden="true" className="hidden mx-4 lg:inline-block">
              |
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </p>
  );
}

export function Navigation(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="sticky top-0 z-30 bg-white">
      <AnnouncementBanner />
      <MobileMenu open={open} setOpen={setOpen} />
      <DesktopMenu setOpen={setOpen} />
    </div>
  );
}
