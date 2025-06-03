export interface Pizza {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export type LoginData = {
  username: string;
  password: string;
};

export type CategoryData = {
  name: string;
};

export type ItemData = {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
};