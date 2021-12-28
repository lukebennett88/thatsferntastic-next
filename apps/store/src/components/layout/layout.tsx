import { Footer } from "../../components/footer";
import type { NextPageWithLayoutProps } from "../../types";
import { Navigation } from "../navigation";

export const Layout: NextPageWithLayoutProps = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
