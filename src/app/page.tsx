import Link from 'next/link';
import Hero from '../components/home/Hero';
import SpecialOffers from '../components/home/SpecialOffers';
import AllCategories from '../components/home/AllCategories';
import Testimonial from '../components/home/Testimonial';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 p-8">
      <Hero />
      <SpecialOffers />
      <AllCategories />
      <Testimonial />
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 mt-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center">Welcome to Big Bazar Ecommerce</h1>
        <p className="text-lg text-gray-600 text-center mb-4">
          Discover the best products at unbeatable prices. Shop now and enjoy a seamless online shopping experience!
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-200"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}
