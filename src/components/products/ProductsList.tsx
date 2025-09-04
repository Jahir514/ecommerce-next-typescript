'use client';
import React from 'react';
import { useGetProductsQuery } from '../../features/products/productsApi';
import SingleProduct from './SingleProduct';
import Loader from '../ui/Loader';
// If you import Product type here, use relative path

const ProductsList = () => {
  // Example: Fetch page 1, branch '5e42b482ad2733136cfe64f9'. Adjust as needed.
  const { data, error, isLoading } = useGetProductsQuery({ pageNo: 1, branch: '5e42b482ad2733136cfe64f9' });
  console.log(data, error, isLoading);
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading products.</div>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data?.data?.map((product: any) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
