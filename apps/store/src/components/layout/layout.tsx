import { Footer } from "../../components/footer";
import type { NextPageWithLayoutProps } from "../../types";
import { Navigation } from "../navigation";

export const Layout: NextPageWithLayoutProps = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
