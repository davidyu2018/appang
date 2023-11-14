export interface Product {
  title?: string;
  name?: string; //
  id: string;
  category: string;
  description: string;
  price?: number;
  albumId? :number | string;
}
export interface Cart {
  itemCount: number; //
  cartPrice: number;
  lines: CartLine[];
}
export interface CartLine {
  product: Product;
  quantity: number;
  total: number | undefined;
}
export interface Order {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shipped: boolean;
  cart?: Cart
}

