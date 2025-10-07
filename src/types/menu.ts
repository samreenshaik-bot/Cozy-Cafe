export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'pastries' | 'desserts' | 'drinks' | 'pasta';
  price: number;
  description: string;
  image: string;
  addons?: Addon[];
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  category: 'milk' | 'flavor' | 'topping' | 'extra' | 'pasta-addon';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedAddons: Addon[];
}

export interface Order {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  hasMembership: boolean;
}
