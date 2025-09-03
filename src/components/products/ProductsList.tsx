
import React from 'react';
import { useGetProductsQuery } from '../../features/products/productsApi';
import SingleProduct from './SingleProduct';
// If you import Product type here, use relative path

const ProductsList = () => {
  // Example: Fetch page 1, branch 'main'. Adjust as needed.
  const { data, error, isLoading } = useGetProductsQuery({ pageNo: 1, branch: 'main' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data?.products?.map((product: any) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
