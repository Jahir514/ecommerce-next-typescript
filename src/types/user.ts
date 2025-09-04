import type { ObjectId } from './product';

export interface User {
  _id: ObjectId;
  name: string;
  phone: {
    number: string;
    verificationCode?: number;
    status?: boolean;
    date?: string;
  };
  messageLimit?: {
    count?: number;
    lastUpdate?: string | null;
  };
  email?: string | null;
  password?: string;
  avatar?: string;
  contact?: {
    address?: string;
    thana?: string;
    district?: string;
    division?: string;
  };
  verify?: boolean;
}
