import { KeyValuePair } from './key-value-pair';
export interface Category {
  id: number;
  name: string;
  tags: KeyValuePair[];
}
