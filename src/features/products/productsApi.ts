import { api } from '../api/api';
import type { Product } from '../../types/product';

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch paginated products: expects { pageNo, branch, type, text } as params
    getProducts: builder.query<any, { pageNo: number; branch?: string; type?: string; text?: string }>({
      query: ({ pageNo, branch, type, text }) => {
        let url = `product/list/${pageNo}`;
        const params = [];
        if (branch) params.push(`branch=${branch}`);
        if (type && text) params.push(`type=${type}&text=${encodeURIComponent(text)}`);
        if (params.length) url += `?${params.join('&')}`;
        return url;
      },
    }),
    // Fetch single product by ID (if implemented in backend)
    getProduct: builder.query<Product, string>({
      query: (id) => `product/${id}`,
    }),
    // Add product
    addProduct: builder.mutation<any, Partial<Product>>({
      query: (body) => ({
        url: 'product/add',
        method: 'POST',
        body,
      }),
    }),
    // Update product
    updateProduct: builder.mutation<any, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `product/update`,
        method: 'PUT',
        body: { id, ...data },
      }),
    }),
    // Delete product
    deleteProduct: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `product/remove`,
        method: 'DELETE',
        body: { id },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
