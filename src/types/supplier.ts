import type { ObjectId } from './product';

export interface Supplier {
  _id: ObjectId;
  branch: ObjectId[];
  category: ObjectId[];
  subcategory: ObjectId[];
  brand: ObjectId[];
  serialNo: number;
  name: string;
  contact?: {
    phone?: string[];
    address?: string;
  };
  instantPayment?: boolean;
  warehouseSupplier?: boolean;
  activeSupplier?: boolean;
  branchWiseOpeningBalance?: Array<{
    branch: ObjectId;
    openingBalance: number;
  }>;
}
