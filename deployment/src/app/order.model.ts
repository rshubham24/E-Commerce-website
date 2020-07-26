export interface OrderModel {
  date: number;
  customerId: string;
  customerName: string;
  mobile: string;
  streetAdress: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  totalPrice: number;
  products: {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
    retailerId: string;
    shopName: string;
    productId: string;
    customerId: string;
    quantity: number;
    id: string;
  }[];
}
