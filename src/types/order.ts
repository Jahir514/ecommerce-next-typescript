import type { ObjectId } from './product';

export interface OrderProduct {
  code: string;
  name: string;
  category: string;
  subcategory: string;
  supplier: string;
  brand: string;
  thumbnail?: string | null;
  discount: number;
  quantity: number;
}

export interface Order {
  _id: ObjectId;
  orderID: number;
  branch: ObjectId;
  user: ObjectId;
  admin?: ObjectId | null;
  products: OrderProduct[];
  // Add more fields as needed from your backend model
}
