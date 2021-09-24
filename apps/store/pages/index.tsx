import * as React from 'react';

import { CategorySection } from '../components/category-section';
import { CollectionSection } from '../components/collection-section';
import { FeaturedSection } from '../components/featured-section';
import { Footer } from '../components/footer';
import { Hero } from '../components/hero';
import { MobileMenu } from '../components/mobile-menu';
import type { NextPageWithLayoutProps } from '../types';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP'];
const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt:
            'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt:
            'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt:
            'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt:
            'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

export const SignInPage: NextPageWithLayoutProps = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-white">
      <MobileMenu
        currencies={currencies}
        mobileMenuOpen={mobileMenuOpen}
        navigation={navigation}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero
        currencies={currencies}
        navigation={navigation}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <CategorySection />
        <FeaturedSection
          id="social-impact-heading"
          heading={['Level up', 'your desk']}
          description="Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice desk setup."
          backgroundImage={{
            src: 'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg',
            altText: '',
          }}
          cta="Show Workspace"
          href="#"
        />
        <CollectionSection />
        <FeaturedSection
          id="comfort-heading"
          heading="Simple productivity"
          description="Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best here. No kanban boards, burndown charts, or tangled flowcharts with our Focus system. Just the undeniable urge to fill empty circles."
          backgroundImage={{
            src: 'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg',
            altText: '',
          }}
          cta="Shop Focus"
          href="#"
        />
      </main>
      <Footer />
    </div>
  );
};

SignInPage.layoutProps = {
  meta: {
    title: 'Sign In',
  },
  Layout: React.Fragment,
};

export default SignInPage;
