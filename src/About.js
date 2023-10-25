import React from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./Context/productcontext";

const About = () => {
  const { myName } = useProductContext();
  const data = {
    name: "Sushmita Ecommerce",
  };

  return (
    <>
      <HeroSection myData={data} />;
      {myName}
    </>
  )
};

export default About;
