import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// import { CategorySection } from '../components/category-section';
import { CollectionSection } from '../components/collection-section';
// import { FeaturedSection } from '../components/featured-section';
import { Hero } from '../components/hero';
import { TopSellingProducts } from '../components/top-selling-products';
import { Collection, getAllCollections } from '../graphql/get-all-collections';
import {
  getTopSellingProducts,
  TopSellingProducts as TopSellingProductsType,
} from '../graphql/get-top-selling-products';
import { addApolloState, initialiseTsGql } from '../utils/apollo-client';
interface HomePageProps {
  collections: Array<Collection>;
  topSellingProducts: TopSellingProductsType;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async () => {
    const client = initialiseTsGql();
    const collections = await getAllCollections(client);
    const topSellingProducts = await getTopSellingProducts({
      client,
      first: 8,
    });
    return addApolloState(client, {
      props: {
        collections,
        topSellingProducts,
      },
    });
  };

export default function HomePage({
  collections,
  topSellingProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className="pb-24 sm:pb-32">
      <Hero />
      <TopSellingProducts topSellingProducts={topSellingProducts} />
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
