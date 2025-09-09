import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

const Cart: React.FC = () => {
  // TODO: Connect to Redux or context for cart data in Next.js
  const cartTotalItem = 0; // Replace with real data
  const cartTotalPrice = 0; // Replace with real data
  const isCartLoading = false; // Replace with real loading state

  const handleCartClick = () => {
    // TODO: Implement cart modal or navigation
  };

  return (
    <div className="flex items-center justify-end space-x-6">
      {/* Wishlist */}
      <div className="flex items-center space-x-2 cursor-pointer hover:text-themeColor transition-colors">
        <div className="relative">
          <Heart className="w-6 h-6 text-gray-600 hover:text-themeColor" />
          <span className="absolute -top-2 -right-2 bg-themeColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">0</span>
        </div>
        <span className="text-gray-700 font-medium">Wishlist</span>
      </div>

      {/* Cart */}
      <div className="flex items-center space-x-1 cursor-pointer hover:text-themeColor transition-colors group" onClick={handleCartClick}>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-themeColor" />
            <span className="absolute -top-2 -right-2 bg-themeColor text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">{isCartLoading ? "..." : cartTotalItem}</span>
          </div>
          <span className="text-gray-700 font-medium group-hover:text-themeColor">Cart</span>
        </div>

        {/* Price badge */}
        <div className="bg-green-50 border border-green-200 px-2 py-1 rounded-md">
          <span className="text-themeColor font-semibold text-sm">৳{isCartLoading ? "..." : cartTotalPrice} </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
