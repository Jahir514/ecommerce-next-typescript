import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

export interface ProductList {
  data: Product[];
  count: number;
}

export interface ProductsState {
  newProducts: Product[];
  specialOffers: Product[];
  productList: ProductList;
  productInformation: Product[];
  singleProduct: Product | null;
  isLoading: boolean;
  isError: boolean;
  branchId: string | null;
  error: string;
}

const initialState: ProductsState = {
  newProducts: [],
  specialOffers: [],
  productList: {
    data: [],
    count: 0,
  },
  productInformation: [],
  singleProduct: null,
  isLoading: false,
  isError: false,
  branchId: null,
  error: "",
};

function transformProductData(product: Product): Product {
  const transformedProduct = { ...product };
  if ((transformedProduct as any).maxQuantity === undefined) {
    (transformedProduct as any).maxQuantity = transformedProduct.quantity;
  }
  (transformedProduct as any).quantity = 1;
  return transformedProduct;
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setNewProducts(state, action: PayloadAction<Product[]>) {
      state.newProducts = action.payload.map(transformProductData);
    },
    setSpecialOffers(state, action: PayloadAction<Product[]>) {
      state.specialOffers = action.payload.map(transformProductData);
    },
    setSingleProduct(state, action: PayloadAction<Product>) {
      state.singleProduct = transformProductData(action.payload);
    },
    setProductList(
      state,
      action: PayloadAction<{ data: Product[]; count?: number }>
    ) {
      const products = action.payload?.data || [];
      const count = action.payload?.count ?? products.length;
      state.productList = {
        data: products.map(transformProductData),
        count,
      };
    },
    pushProductInformation(state, action: PayloadAction<Product[]>) {
      const transformed = action.payload.map(transformProductData);
      state.productList.data.push(...transformed);
    },
    clearProductList(state) {
      state.productList = {
        data: [],
        count: 0,
      };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.error = action.payload || "Something went wrong.";
    },
    clearError(state) {
      state.isError = false;
      state.error = "";
    },
  },
});

export const {
  setNewProducts,
  setSpecialOffers,
  setSingleProduct,
  setProductList,
  pushProductInformation,
  clearProductList,
  setLoading,
  setError,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
