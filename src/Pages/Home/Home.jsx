import React, { useEffect } from "react";
import Banner from "./Banner";
import CheckoutPage from "../CheckOut/CheckoutPage";
import WhyChooseUs from "./WhyChooseUs";
import SpecialOffer from "./SpecialOffer";
import Gallery from "./Gallery";
import SpiceSection from "./SpiceSection";

const Home = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_name: "Home",
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <div>
      <Banner />
      <Gallery />
      <SpiceSection />
      <WhyChooseUs />
      <SpecialOffer />
      <CheckoutPage />
    </div>
  );
};

export default Home;
