import React, { useMemo, useState } from "react";
import { Plus, Minus, ShoppingBasket } from "lucide-react";
import { toast } from "react-toastify";
import type { Product } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
} from "@/features/cart/cartApi";
import {
  addToLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
} from "@/features/cart/cartSlice";
type CartItem = {
  quantity: number;
  maxQuantity?: number;
};

type Props = {
  product: Product;
};

const ProductCartActions: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  //   const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const { CartInformation } = useSelector((state: any) => state.cart);
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [updateCartQuantity, { isLoading: isUpdatingQuantity }] =
    useUpdateCartQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const branchId = useSelector(
    (state: any) => state.location.selectedBranch?.id
  );

  const cartItemsMap = useMemo(() => {
    const map = new Map();
    interface CartProduct {
      _id: string;
      [key: string]: any;
    }

    interface CartInformationItem {
      _id: string;
      product?: CartProduct;
      quantity: number;
      maxQuantity?: number;
      [key: string]: any;
    }

    const CartInformationTyped: CartInformationItem[] =
      CartInformation as CartInformationItem[];

    CartInformationTyped.forEach((item: CartInformationItem) => {
      const productId: string | undefined = localStorage.userToken
        ? item.product?._id
        : item._id;
      if (productId) {
        map.set(productId, item);
      }
    });
    return map;
  }, [CartInformation]);

  const add_to_cart = (product: Product) => {
    let code = product._id;
    if (localStorage.getItem("userToken")) {
      addToCart({ code, branch: branchId });
    } else {
      dispatch(addToLocalCart(product));
    }
  };

  const checkProductToCart = (product: Product) => {
    return cartItemsMap.get(product._id) || null;
  };

  const cartQuantityPlus = (product: Product) => {
    const cartItem = checkProductToCart(product);
    if (cartItem && cartItem.quantity < cartItem.maxQuantity) {
      const newQuantity = cartItem.quantity + 1;
      if (localStorage.getItem("userToken")) {
        updateCartQuantity({
          productId: cartItem._id,
          quantity: newQuantity,
          branch: branchId,
        });
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else {
      toast.warning(
        <div>
          We are very sorry! We currently do not have the quantity of{" "}
          <strong>'{cartItem?.name || product.name}'</strong> in stock that you
          require.
        </div>,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const cartQuantityMinus = (product: Product) => {
    const cartItem = checkProductToCart(product);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
      if (localStorage.getItem("userToken")) {
        updateCartQuantity({
          productId: cartItem._id,
          quantity: newQuantity,
          branch: branchId,
        });
      } else {
        dispatch(
          updateLocalCartQuantity({
            productId: cartItem._id,
            quantity: newQuantity,
          })
        );
      }
    } else if (cartItem && cartItem.quantity === 1) {
      removeProduct(cartItem);
    }
  };

  const removeProduct = (item: Product) => {
    const productId = item._id;
    if (localStorage.getItem("userToken")) {
      removeFromCart({
        productId,
        branch: branchId,
      });
    } else {
      dispatch(removeFromLocalCart(productId));
    }
  };

  if (product.quantity > 0) {
    return (
      <div className="actions mt-4">
        {!cartItemsMap.get(product._id) ? (
          <button
            onClick={() => add_to_cart(product)}
            disabled={isAddingToCart}
            className="w-full bg-themeColor text-white text-sm font-medium py-2 rounded hover:bg-[#41b899] disabled:opacity-50"
          >
            <ShoppingBasket className="inline-block w-4 h-4 mr-1" />
            {isAddingToCart ? " Adding..." : " Add To Cart"}
          </button>
        ) : (
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => cartQuantityMinus(product)}
              disabled={isUpdatingQuantity}
              className="w-1/5 p-3 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-3/5 px-4 py-2 border-x border-gray-300 font-medium text-center cursor-pointer">
              {cartItemsMap.get(product._id)?.quantity || 0}
            </span>
            <button
              onClick={() => cartQuantityPlus(product)}
              disabled={isUpdatingQuantity}
              className="w-1/5 p-3 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="mt-4 text-center">
        <span className="text-red-500 font-bold">Out of Stock</span>
      </div>
    );
  }
};

export default ProductCartActions;
