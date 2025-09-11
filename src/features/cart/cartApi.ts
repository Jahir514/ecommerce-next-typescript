import { api } from "../api/api";
import type { Product } from "../../types/product";

export interface CartItem extends Product {
  quantity: number;
  maxQuantity?: number;
}

export interface CartResponse {
  data: CartItem[];
  msg?: string;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], { branch?: string }>({
      query: ({ branch }) => {
        return {
          url: "cart",
          params: { branch: branch || localStorage.branchId },
        };
      },
      transformResponse: (response: CartResponse | CartItem[]) => {
        const cartData = Array.isArray(response) ? response : response.data;
        localStorage.setItem("CartProduct", JSON.stringify(cartData));
        return cartData;
      },
      //   providesTags: [{ type: "Cart" }],
    }),

    addToCart: builder.mutation<CartItem[], { code: string; branch?: string }>({
      query: ({ code, branch }) => ({
        url: "cart",
        method: "POST",
        body: {
          code,
          branch: branch || localStorage.branchId,
        },
      }),
      //   invalidatesTags: [{ type: "Cart" }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const productsArray: CartItem[] =
            data && "data" in data
              ? (data as CartResponse).data
              : (data as CartItem[]);
          const existingCartProducts: CartItem[] = JSON.parse(
            localStorage.getItem("CartProduct") ?? "[]"
          );
          productsArray.forEach((product) => {
            const isProductExists = existingCartProducts.some(
              (item) => item._id === product._id
            );
            if (!isProductExists) {
              const modifiedProduct: CartItem = {
                ...product,
                maxQuantity: product.maxQuantity ?? product.quantity,
                quantity: 1,
              };
              existingCartProducts.push(modifiedProduct);
            }
          });
          localStorage.setItem(
            "CartProduct",
            JSON.stringify(existingCartProducts)
          );
        } catch (error) {
          console.error("Error in addToCart onQueryStarted:", error);
        }
      },
    }),

    updateCartQuantity: builder.mutation<
      CartItem[],
      { productId: string; quantity: number; branch?: string }
    >({
      query: ({ productId, quantity, branch }) => ({
        url: "cart",
        method: "PUT",
        body: {
          id: productId,
          quantity,
          branch: branch || localStorage.branchId,
        },
      }),
      //   invalidatesTags: [{ type: "Cart" }],
      async onQueryStarted({ productId, quantity }, { queryFulfilled }) {
        try {
          await queryFulfilled;
          const existingCartProducts: CartItem[] = JSON.parse(
            localStorage.getItem("CartProduct") ?? "[]"
          );
          const updatedCartProducts = existingCartProducts.map((item) => {
            if (item._id === productId) {
              return {
                ...item,
                quantity,
              };
            }
            return item;
          });
          localStorage.setItem(
            "CartProduct",
            JSON.stringify(updatedCartProducts)
          );
        } catch (error) {
          console.error("Error in updateCartQuantity onQueryStarted:", error);
        }
      },
    }),

    removeFromCart: builder.mutation<
      CartItem[],
      { productId: string; branch?: string }
    >({
      query: ({ productId, branch }) => ({
        url: "cart/delete",
        method: "DELETE",
        body: {
          id: productId,
          branch: branch || localStorage.branchId,
          clear_all: "false",
        },
      }),
      //   invalidatesTags: [{ type: "Cart" }],
      async onQueryStarted({ productId }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const responseData: CartItem[] =
            data && "data" in data
              ? (data as CartResponse).data
              : (data as CartItem[]);
          const existingCartProducts: CartItem[] = JSON.parse(
            localStorage.getItem("CartProduct") ?? "[]"
          );
          let newCart: CartItem[] = [];
          responseData.forEach((product) => {
            existingCartProducts.forEach((item) => {
              if (
                (product as any).product?._id === (item as any).product?._id
              ) {
                newCart.push(item);
              }
            });
          });
          localStorage.setItem("CartProduct", JSON.stringify(newCart));
        } catch (error) {
          console.error("Error in removeFromCart onQueryStarted:", error);
        }
      },
    }),

    clearCart: builder.mutation<{ msg?: string }, { branch?: string }>({
      query: ({ branch }) => ({
        url: "cart/delete",
        method: "DELETE",
        body: {
          id: null,
          branch: branch || localStorage.branchId,
          clear_all: "true",
        },
      }),
      //   invalidatesTags: [{ type: "Cart" }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const responseData =
            data && "data" in data
              ? (data as CartResponse)
              : { msg: (data as any)?.msg };
          if (
            responseData.msg === "cart is empty" ||
            responseData.msg === "No token, authorization denied"
          ) {
            localStorage.removeItem("CartProduct");
          }
        } catch (error) {
          console.error("Error in clearCart onQueryStarted:", error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
