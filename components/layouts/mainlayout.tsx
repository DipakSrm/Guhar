import React from "react";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";
import Topbar from "../shared/topbar";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Topbar />
      <Navbar />
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
