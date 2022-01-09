import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

// import { CategorySection } from '../components/category-section';
import { CollectionSection } from "../components/collection-section";
// import { FeaturedSection } from '../components/featured-section';
import { Hero } from "../components/hero";
import { ProductList } from "../components/product-list";
import { Collection, getAllCollections } from "../graphql/get-all-collections";
import type { RecentProducts } from "../graphql/get-recent-products";
import { getRecentProducts } from "../graphql/get-recent-products";
import type { TopSellingProducts as TopSellingProductsType } from "../graphql/get-top-selling-products";
import { getTopSellingProducts } from "../graphql/get-top-selling-products";
import { addApolloState } from "../utils/apollo-client";

interface HomePageProps {
  collections: Array<Collection>;
  recentProducts: RecentProducts;
  topSellingProducts: TopSellingProductsType;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const collections = await getAllCollections();
  const recentProducts = await getRecentProducts({
    first: 8,
  });
  const topSellingProducts = await getTopSellingProducts({
    first: 8,
  });
  return addApolloState({
    props: {
      collections,
      topSellingProducts,
      recentProducts,
    },
  });
};

export default function HomePage({
  collections,
  recentProducts,
  topSellingProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className="pb-24 sm:pb-32">
      <Hero />
      <ProductList heading="New Arrivals" topSellingProducts={recentProducts} />
      {/* <CategorySection /> */}
      {/* <FeaturedSection
        id="social-impact-heading"
        heading={['Level up', 'your desk']}
        description="Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice desk setup."
        backgroundImage={{
          src: 'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg',
          altText: '',
        }}
        cta="Show Workspace"
        href="#"
      /> */}
      <CollectionSection collections={collections} />
      <ProductList heading="Top Selling Products" topSellingProducts={topSellingProducts} />
      {/* <FeaturedSection
        id="comfort-heading"
        heading="Simple productivity"
        description="Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best here. No kanban boards, burndown charts, or tangled flowcharts with our Focus system. Just the undeniable urge to fill empty circles."
        backgroundImage={{
          src: 'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg',
          altText: '',
        }}
        cta="Shop Focus"
        href="#"
      /> */}
    </div>
  );
}
