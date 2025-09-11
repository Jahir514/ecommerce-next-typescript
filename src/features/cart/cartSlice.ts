import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  maxQuantity?: number;
  quantity: number;
  [key: string]: any;
}

export interface CartState {
  isCartOpen: boolean;
  CartInformation: CartItem[];
  localCartProducts: CartItem[];
  isLoading: boolean;
  isError: boolean;
  branchId: string | null;
  error: string;
}

const initialState: CartState = {
  isCartOpen: false,
  CartInformation: [],
  localCartProducts: [],
  isLoading: false,
  isError: false,
  branchId: null,
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartInformation(state) {
      const existingCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("CartProduct") ?? "[]"
      );
      state.CartInformation = existingCartProducts;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clearError(state) {
      state.isError = false;
      state.error = "";
    },
    openCartModule(state) {
      state.isCartOpen = true;
    },
    closeCartModule(state) {
      state.isCartOpen = false;
    },
    addToLocalCart(state, action: PayloadAction<CartItem>) {
      const product = action.payload;
      const existingCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("localCartProduct") ?? "[]"
      );
      const isProductExists = existingCartProducts.some(
        (item) => item._id === product._id
      );
      if (!isProductExists) {
        const newProduct: CartItem = {
          ...product,
          maxQuantity: product.maxQuantity
            ? product.maxQuantity
            : product.quantity,
          quantity: 1,
        };
        existingCartProducts.push(newProduct);
        localStorage.setItem(
          "localCartProduct",
          JSON.stringify(existingCartProducts)
        );
        state.CartInformation = existingCartProducts;
      }
    },
    updateLocalCartQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const existingCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("localCartProduct") ?? "[]"
      );
      const updatedCartProducts = existingCartProducts.map((item) => {
        if (item._id === productId) {
          return {
            ...item,
            quantity: quantity,
          };
        }
        return item;
      });
      localStorage.setItem(
        "localCartProduct",
        JSON.stringify(updatedCartProducts)
      );
      state.CartInformation = updatedCartProducts;
    },
    removeFromLocalCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const existingCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("localCartProduct") ?? "[]"
      );
      const filteredCartProducts = existingCartProducts.filter(
        (item) => item._id !== productId
      );
      localStorage.setItem(
        "localCartProduct",
        JSON.stringify(filteredCartProducts)
      );
      state.CartInformation = filteredCartProducts;
    },
    clearAllFromLocalCart(state) {
      localStorage.removeItem("localCartProduct");
      state.CartInformation = [];
    },
    loadLocalCartProducts(state) {
      const existingCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("localCartProduct") ?? "[]"
      );
      state.CartInformation = existingCartProducts;
    },
    syncCartAfterLogin(state) {
      const localCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("localCartProduct") ?? "[]"
      );
      const serverCartProducts: CartItem[] = JSON.parse(
        localStorage.getItem("CartProduct") ?? "[]"
      );
      const mergedCart: CartItem[] = [...serverCartProducts];
      localCartProducts.forEach((localProduct) => {
        const existsInServerCart = serverCartProducts.some(
          (serverProduct) => serverProduct._id === localProduct._id
        );
        if (!existsInServerCart) {
          mergedCart.push(localProduct);
        }
      });
      localStorage.setItem("CartProduct", JSON.stringify(mergedCart));
      localStorage.removeItem("localCartProduct");
      state.CartInformation = mergedCart;
    },
  },
});

export const {
  setCartInformation,
  setLoading,
  clearError,
  addToLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
  clearAllFromLocalCart,
  loadLocalCartProducts,
  openCartModule,
  closeCartModule,
  syncCartAfterLogin,
} = cartSlice.actions;

export default cartSlice.reducer;
