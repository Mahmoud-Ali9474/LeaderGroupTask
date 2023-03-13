export interface SaveProduct {
  id: number;
  title: string;
  desc: string;
  price: number;
  quantity: number;
  categoryId: number | undefined;
  tags: number[];
}
