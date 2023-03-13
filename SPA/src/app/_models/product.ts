import { KeyValuePair } from './key-value-pair';
export interface Product {
  id: number;
  title: string;
  desc: string;
  price: number;
  quantity: number;
  categoryId: number;
  addedDate: Date;
  category: KeyValuePair;
  tags: KeyValuePair[];
}
