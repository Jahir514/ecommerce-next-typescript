import React from 'react';
import type { Product } from '../../types/product';

interface SingleProductProps {
  product: Product;
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  return (
    <li>
      <strong>{product.name}</strong> - {product.price}
    </li>
  );
};

export default SingleProduct;
