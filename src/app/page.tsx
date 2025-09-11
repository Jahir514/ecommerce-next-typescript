import Link from "next/link";
import Hero from "../components/home/Hero";
import SpecialOffers from "../components/home/SpecialOffers";
import AllCategories from "../components/home/AllCategories";
import Testimonial from "../components/home/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialOffers />
      <AllCategories />
      <Testimonial />
    </>
  );
}
