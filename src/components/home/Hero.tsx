"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
// Images from public folder, use path strings
import { useGetOffersByBranchQuery } from "@/features/offer/offerApi";
// import { getImageUrl } from "@/utils/api";

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-next-arrow`} onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-prev-arrow`} onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
}

const Hero: React.FC = () => {
  const branchId = useSelector(
    (state: any) => state.location.selectedBranch?.id
  );
  const { data, isLoading, error } = useGetOffersByBranchQuery(branchId, {
    skip: !branchId,
  });
  const largeBanners =
    data?.data?.filter((banner: any) => banner.device === "large") || [];

  // Fallback banners if API fails or no data
  const fallbackBanners = [
    { image: "/assets/images/banner-2.jpg", alt: "Banner 2" },
    { image: "/assets/images/banner.jpg", alt: "Banner 1" },
    { image: "/assets/images/banner-3.jpg", alt: "Banner 3" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  var sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // Determine which banners to show
  const bannersToShow =
    largeBanners.length > 0 ? largeBanners : fallbackBanners;

  if (isLoading) {
    return (
      <div className="slider-container relative w-full h-[400px] flex items-center justify-center bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="slider-container relative w-full">
      <Slider {...sliderSettings} className="relative">
        {bannersToShow.map((banner: any, index: number) => (
          <div key={index} className="focus-visible:outline-none">
            {banner.photo ? (
              <Image
                src={getImageUrl(banner.photo)}
                alt={banner.title || `Banner ${index + 1}`}
                width={1200}
                height={400}
                className="w-full h-[400px] object-fill"
                priority={index === 0}
                unoptimized // Remove if you want Next.js optimization for remote images
              />
            ) : (
              <Image
                src={banner.image}
                alt={banner.title || `Banner ${index + 1}`}
                width={1200}
                height={400}
                className="w-full h-[400px] object-fill"
                priority={index === 0}
              />
            )}
            {banner.title && (
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                <h3 className="font-semibold">{banner.title}</h3>
              </div>
            )}
          </div>
        ))}
      </Slider>
      {error && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm">
          Failed to load banners
        </div>
      )}
    </div>
  );
};

export default Hero;
