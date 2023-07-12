import React from "react";
import Navbar from "../shared/navbar";
import Footer from "../shared/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className=" bg-gray-200">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
