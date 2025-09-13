export type ObjectId = string;

interface UnitType {
  _id: ObjectId;
  name: string;
  shortform?: string;
  fractionAllowed?: boolean;
}

export interface Product {
  _id: ObjectId;
  branch: ObjectId;
  category: ObjectId;
  subcategory: ObjectId;
  brand: ObjectId;
  supplier: ObjectId;
  serialNo: number;
  barcode?: string;
  name: string;
  slug?: string;
  quantity: number;
  price: {
    sell: number;
    purchase: number;
  };
  second_price?: {
    quantity: number;
    sell: number;
    purchase: number;
  };
  discount?: number;
  offerimage?: string | null;
  offerstatus?: boolean;
  vat?: number;
  description?: string;
  images?: string[];
  thumbnail?: string;
  isAvailable?: boolean;
  isDualPriceActive?: boolean;
  offerProduct?: boolean;
  expireDate?: string;
  reorderLevel?: number;
  weight?: number;
  unitType?: UnitType;
  availableSize?: ObjectId[];
  online_active?: boolean;
  pos_active?: boolean;
  newProduct?: boolean;
  specialOffer?: boolean;
  bestSell?: boolean;
  personalDiscountAvailable?: boolean;
  daily_transaction?: Array<{
    receiving?: number;
    return?: number;
    disposal?: number;
    date?: string;
  }>;
  daily_sell?: Array<{
    sell?: number;
    exchange?: number;
    refund?: number;
    date?: string;
  }>;
  daily_stock?: Array<{
    stock?: number;
    date?: string;
  }>;
  created_by?: ObjectId;
  create?: string;
  update?: string | null;
}
