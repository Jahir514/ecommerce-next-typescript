"use client";
import React, { useEffect, useState } from "react";
import { setSpecialOffers } from "@/features/products/productsSlice";
import { useGetProductsQuery } from "@/features/products";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Plus, Minus, ChevronRight, ChevronLeft } from "lucide-react";

import ProductSlider from "../common/ProductSlider";
// import Swiper, SwiperSlide, Navigation, Autoplay as needed

import type { Product } from "@/types/product";

const SpecialOffers = () => {
  const dispatch = useDispatch();
  const [slides, setSlides] = useState<{ data: Product[]; count: number }>({
    data: [],
    count: 0,
  });
  const branchID = useSelector(
    (state: any) => state.location.selectedBranch?.id
  );
  const specialOffers = useSelector(
    (state: any) => state.products.specialOffers
  );
  // const CartInformation = useSelector(
  //   (state: any) => state.cart.CartInformation || []
  // );
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    pageNo: 1,
    branchID: branchID,
    queryString: { specialOffer: true },
  });

  useEffect(() => {
    if (productsData) {
      let products = [];

      if (productsData.data && Array.isArray(productsData.data)) {
        // Format: { data: [...], count: 10 }
        products = productsData.data;
      } else if (Array.isArray(productsData)) {
        // Format: [...]
        products = productsData;
      }

      if (products.length > 0) {
        dispatch(setSpecialOffers(products));
      }
    }
  }, [productsData, dispatch]);

  useEffect(() => {
    if (
      specialOffers &&
      Array.isArray(specialOffers) &&
      specialOffers.length > 0
    ) {
      const totalProducts = specialOffers.length;
      const maxSlides = Math.min(totalProducts, 7);

      let random_Start =
        totalProducts <= 7
          ? 0
          : Math.floor(Math.random() * (totalProducts - 7));
      let selectedProducts = specialOffers.slice(
        random_Start,
        random_Start + maxSlides
      );

      const slidesData = {
        count: totalProducts,
        data: selectedProducts,
      };

      setSlides(slidesData);
    } else {
      setSlides({ data: [], count: 0 });
    }
  }, [specialOffers]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load special products");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="home-new-products">
          <div className="sec-header flex items-center justify-between mb-4">
            <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1">
              Special Offers
            </h2>
          </div>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading special offers...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="home-new-products">
        <div className="sec-header flex items-center justify-between mb-4">
          <h2 className="text-font-14 sm:text-font-16 md:text-font-26 lg:text-font-32 text-themeColor capitalize font-bold mb-1 ">
            Special Products
          </h2>
          <div className="flex space-x-2">
            <button className="prev-special-offer carousel-nav bg-gray-300 text-themeColor w-8 h-8 flex items-center justify-center rounded-full hover:bg-themeColor hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="next-special-offer carousel-nav bg-gray-300 text-themeColor w-8 h-8 flex items-center justify-center rounded-full hover:bg-themeColor hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Replace grid with Swiper */}
        <ProductSlider products={slides.data} />
      </div>
    </div>
  );
};

export default SpecialOffers;
