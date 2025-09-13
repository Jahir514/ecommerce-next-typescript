import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import ProductCartActions from "./ProductCartActions";
import ProductLoadCard from "../common/ProductLoadCard";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type ProductSliderProps = {
  products: Product[];
};

export default function ProductSlider({ products }: ProductSliderProps) {
  return (
    <Swiper
      slidesPerView={7}
      spaceBetween={20}
      loop={false}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: ".next-special-offer",
        prevEl: ".prev-special-offer",
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        480: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        768: { slidesPerView: 4, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
        1500: { slidesPerView: 6, spaceBetween: 20 },
      }}
      className="mySwiper bg-sectionBackgroundLight"
    >
      {products.map((product, index) => (
        <SwiperSlide key={product._id || index}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
      <SwiperSlide key="load-more-card" onClick={() => {}}>
        <ProductLoadCard />
      </SwiperSlide>
    </Swiper>
  );
}
