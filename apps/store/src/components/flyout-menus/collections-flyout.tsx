import * as React from "react";

import type { Collection } from "../../graphql/get-all-collections";
import { getAllCollections } from "../../graphql/get-all-collections";
import { FlyoutCta, FlyoutCtas, FlyoutList, FlyoutListItem, FlyoutMenu } from "./flyout-menu";

export function CollectionsFlyout() {
  const [collections, setCollections] = React.useState<Collection[]>([]);
  React.useEffect(() => {
    (async () => {
      setCollections(await getAllCollections());
    })();
  }, []);

  const makeCollectionHref = (handle: string) => `/collections/${handle}`;

  return (
    <FlyoutMenu label="Collections">
      <FlyoutCtas>
        {collections.slice(0, 2).map(({ node }) => (
          <FlyoutCta
            key={node.id}
            title={node.title}
            altText={node.image?.altText ?? ""}
            href={makeCollectionHref(node.handle)}
            imgSrc={node.image?.transformedSrc}
          />
        ))}
      </FlyoutCtas>
      <FlyoutList heading="Collections" headingId="shop-by-collection">
        {collections.map(({ node }) => (
          <FlyoutListItem key={node.id} href={makeCollectionHref(node.handle)} title={node.title} />
        ))}
      </FlyoutList>
    </FlyoutMenu>
  );
}
