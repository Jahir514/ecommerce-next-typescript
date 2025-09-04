import type { ObjectId } from './product';

export interface SubCategory {
  _id: ObjectId;
  branch: ObjectId[];
  category: ObjectId[];
  serialNo: number;
  slug: string;
  name: string;
  isSizeAvailable?: boolean;
  isWeightAvailable?: boolean;
  create?: string;
  update?: string | null;
}
