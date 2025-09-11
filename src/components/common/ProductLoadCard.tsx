import React from "react";

const ProductLoadCard: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
      <span className="text-2xl text-gray-500">...</span>
    </div>
    <span className="text-gray-500">Load More</span>
  </div>
);

export default ProductLoadCard;
