import { api } from "../api/api";
import type { Product } from "../../types/product";

export interface GetProductsParams {
  pageNo: number;
  branchID: string;
  queryString?: Record<string, any>;
}

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, GetProductsParams>({
      query: ({ pageNo, branchID, queryString = {} }) => {
        let searchQuery = "";
        for (const key in queryString) {
          if (
            queryString[key] !== undefined &&
            queryString[key] !== null &&
            queryString[key] !== ""
          ) {
            searchQuery += `&${key}=${encodeURIComponent(queryString[key])}`;
          }
        }
        let apiUrl = `/product/lists/${pageNo}?branch=${branchID}${searchQuery}`;
        return apiUrl;
      },
      // providesTags: (result, error, { pageNo, branchID }) => [
      //   { type: "Product", id: `LIST-${branchID}-${pageNo}` },
      // ],
      transformResponse: (response: any) => {
        return response;
      },
    }),
    // ...existing code...
    getProduct: builder.query<Product, string>({
      query: (id) => `/product/${id}`,
    }),
    addProduct: builder.mutation<any, Partial<Product>>({
      query: (body) => ({
        url: "/product/add",
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation<
      any,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/product/update`,
        method: "PUT",
        body: { id, ...data },
      }),
    }),
    deleteProduct: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/product/remove`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductQuery,
} = productsApi;
