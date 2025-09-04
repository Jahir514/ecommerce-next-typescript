import type { ObjectId } from './product';

export interface Category {
  _id: ObjectId;
  branch: ObjectId[];
  slug: string;
  serialNo: number;
  name: string;
  icon?: string | null;
  cover?: string | null;
  vat?: number;
  negativeSellEnabled?: Array<{
    status?: boolean;
    branch?: ObjectId | null;
    name?: string | null;
  }>;
  inactiveInEcommerce?: boolean;
}
