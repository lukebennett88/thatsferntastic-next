import { Popover } from "@headlessui/react";

import { CategoryFlyout } from "./categories-flyout";
import { CollectionsFlyout } from "./collections-flyout";

export function FlyoutMenus(): JSX.Element {
  return (
    <Popover.Group className="z-30 hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        <CollectionsFlyout />
        <CategoryFlyout />
      </div>
    </Popover.Group>
  );
}
