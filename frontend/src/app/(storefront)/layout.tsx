import "@/styles/storefront.css";

import Header from "@/components/storefront/Header";
import StoreFrontProviders from "@/components/storefront/StoreFrontProviders";

export const metadata = {
  title: "Ecom",
  description: "Your ecommerce store",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreFrontProviders>
      <Header />
      {children}
    </StoreFrontProviders>
  );
}
