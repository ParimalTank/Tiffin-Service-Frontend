import React from "react";
import Navbars from "../components/Navbars";
import Slider from "../components/Slider";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Testimonial from "./Testimonial";
const Home = () => {
  return (
    <div>
      <Navbars />
      <Slider />
      <Cards />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
