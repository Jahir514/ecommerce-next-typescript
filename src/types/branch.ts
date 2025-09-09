import type { ObjectId } from './product';

export interface Branch {
  _id: ObjectId;
  admin: ObjectId;
  serialNo: number;
  name: string;
  address: string;
  areas?: Array<{
    code: number;
    name: string;
  }>;
  thana?: {
    id: number;
    name: string;
  };
  district?: {
    id: number;
    name: string;
  };
  division?: {
    id: number;
    name: string;
  };
}
