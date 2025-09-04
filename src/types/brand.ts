import type { ObjectId } from './product';

export interface Brand {
  _id: ObjectId;
  branch: ObjectId[];
  category: ObjectId[];
  subcategory: ObjectId[];
  serialNo: number;
  name: string;
  slug: string;
  create?: string;
  update?: string | null;
}
