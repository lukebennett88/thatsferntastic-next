import { useGetAllCategories } from "../../utils/hooks/use-get-all-categories";
import { FlyoutCta, FlyoutCtas, FlyoutList, FlyoutListItem, FlyoutMenu } from "./flyout-menu";

export function CategoryFlyout() {
  const categories = useGetAllCategories();
  return (
    <FlyoutMenu label="Categories">
      <FlyoutCtas>
        <FlyoutCta
          title="Mini pouches"
          altText=""
          href="/categories?type=Mini%20Pouches"
          imgSrc="https://cdn.shopify.com/s/files/1/0375/3440/0571/products/96038F94-9738-4195-BD9A-8ABC089F38C2_1_105_c.jpg?v=1617859357&height=1050&width=1050&w=1920&q=75"
        />
        <FlyoutCta
          title="Scrunchies"
          altText=""
          href="/categories?type=Scrunchies"
          imgSrc="https://cdn.shopify.com/s/files/1/0375/3440/0571/products/image_2933202d-c11f-4f27-8060-daa4e0975239.jpg?v=1631752407&height=1050&width=1050&w=1920&q=75"
        />
      </FlyoutCtas>
      <FlyoutList heading="Categories" headingId="shop-by-category">
        {categories.map(({ category, href }) => (
          <FlyoutListItem key={category} href={href} title={category} />
        ))}
      </FlyoutList>
    </FlyoutMenu>
  );
}
