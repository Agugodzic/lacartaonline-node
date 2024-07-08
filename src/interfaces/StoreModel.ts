export default interface StoreModel {
  id: number;
  userid: number;
  deliverymethod?: number;
  storename?: string | null;
  description?: string;
  logo?: string;
  banner?: string;
  email?: string;
  phone?: string;
  route?: string;
  owner?: string;
  address?: string;
  cp?: string;
  store_category?: string;
  locality?: string;
}
