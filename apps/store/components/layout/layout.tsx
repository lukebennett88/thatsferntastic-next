import { Footer } from '../../components/footer';
import type { NextPageWithLayoutProps } from '../../types';
import { Navigation } from '../navigation';

export const Layout: NextPageWithLayoutProps = ({ children }) => {
  return (
    <div className="bg-white">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
