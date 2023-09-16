export interface Product {
  id?: number;
  uuid?: string;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  image1?: string;
  image2?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id?: number;
    uuid?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
