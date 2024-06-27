import { Dispatch, SetStateAction } from "react";
export interface IInputData {
  email: string;
  password: string;
}

export type TProduct = {
  name: string;
  count: number;
  price: number;
};

export type TOrder = {
  id: number;
  createdAt: string;
  phone: string;
  name: string;
  email: string;
  communication: string;
  productList: TProduct[];
  sum: number;
  status: boolean;
  status_collect: boolean;
  comment_client: string;
  comment_admin: string;
};

export type OrdersArrType = TOrder[];

export type OrdersSliceType = {
  orders: OrdersArrType;
  order: TOrder;
  filteredOrders: OrdersArrType;
  adminSearchInput: {search: string};
};

export type TPropsBackground = {
  children: React.ReactNode;
  img?: string;
};
