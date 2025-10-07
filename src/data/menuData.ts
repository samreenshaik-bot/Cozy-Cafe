import { MenuItem, Addon } from '@/types/menu';
import coffeeEspresso from '@/assets/coffee-espresso-updated.jpg';
import cappuccino from '@/assets/cappuccino.jpg';
import latte from '@/assets/latte.jpg';
import americano from '@/assets/americano.jpg';
import bagel from '@/assets/bagel.jpg';
import hotChocolate from '@/assets/hot-chocolate.jpg';
import tiramisu from '@/assets/tiramisu.jpg';
import cookies from '@/assets/cookies.jpg';
import croissant from '@/assets/croissant.jpg';
import lemonade from '@/assets/lemonade.jpg';
import icedTea from '@/assets/iced-tea.jpg';
import cheesecake from '@/assets/cheesecake.jpg';
import cinnamonRoll from '@/assets/cinnamon-roll.jpg';
import danish from '@/assets/danish.jpg';
import everythingBagel from '@/assets/everything-bagel.jpg';
import blueberryBagel from '@/assets/blueberry-bagel.jpg';
import glazedDonut from '@/assets/glazed-donut.jpg';
import chocolateDonut from '@/assets/chocolate-donut.jpg';
import strawberryTart from '@/assets/strawberry-tart.jpg';
import painAuChocolat from '@/assets/pain-au-chocolat.jpg';
import brownie from '@/assets/brownie.jpg';
import redPasta from '@/assets/red-pasta.jpg';
import whitePasta from '@/assets/white-pasta.jpg';
import pinkPasta from '@/assets/pink-pasta.jpg';

export const addons: Addon[] = [
  // Milk options
  { id: 'whole-milk', name: 'Whole Milk', price: 0, category: 'milk' },
  { id: 'almond-milk', name: 'Almond Milk', price: 0.75, category: 'milk' },
  { id: 'oat-milk', name: 'Oat Milk', price: 0.75, category: 'milk' },
  { id: 'soy-milk', name: 'Soy Milk', price: 0.75, category: 'milk' },
  { id: 'coconut-milk', name: 'Coconut Milk', price: 0.75, category: 'milk' },
  
  // Flavors
  { id: 'vanilla', name: 'Vanilla Syrup', price: 0.50, category: 'flavor' },
  { id: 'caramel', name: 'Caramel Syrup', price: 0.50, category: 'flavor' },
  { id: 'hazelnut', name: 'Hazelnut Syrup', price: 0.50, category: 'flavor' },
  { id: 'mocha', name: 'Mocha Syrup', price: 0.50, category: 'flavor' },
  
  // Toppings
  { id: 'whipped-cream', name: 'Whipped Cream', price: 0.50, category: 'topping' },
  { id: 'chocolate-drizzle', name: 'Chocolate Drizzle', price: 0.50, category: 'topping' },
  { id: 'cinnamon', name: 'Cinnamon Powder', price: 0.25, category: 'topping' },
  
  // Extras
  { id: 'extra-shot', name: 'Extra Espresso Shot', price: 1.00, category: 'extra' },
  { id: 'extra-sugar', name: 'Extra Sugar', price: 0, category: 'extra' },
  
  // Pasta addons
  { id: 'extra-cheese', name: 'Extra Parmesan', price: 1.00, category: 'pasta-addon' },
  { id: 'grilled-chicken', name: 'Grilled Chicken', price: 3.00, category: 'pasta-addon' },
  { id: 'mushrooms', name: 'Sautéed Mushrooms', price: 1.50, category: 'pasta-addon' },
  { id: 'olives', name: 'Olives', price: 0.75, category: 'pasta-addon' },
  { id: 'garlic-bread', name: 'Garlic Bread', price: 2.00, category: 'pasta-addon' },
  { id: 'basil', name: 'Fresh Basil', price: 0.50, category: 'pasta-addon' },
  { id: 'chili-flakes', name: 'Chili Flakes', price: 0, category: 'pasta-addon' },
];

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'coffee',
    price: 3.50,
    description: 'Rich and bold Italian espresso',
    image: coffeeEspresso,
    addons: addons.filter(a => a.category === 'extra'),
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    price: 4.50,
    description: 'Espresso with steamed milk foam',
    image: cappuccino,
    addons: addons.filter(a => ['milk', 'flavor', 'topping', 'extra'].includes(a.category)),
  },
  {
    id: 'latte',
    name: 'Caffe Latte',
    category: 'coffee',
    price: 4.75,
    description: 'Smooth espresso with steamed milk',
    image: latte,
    addons: addons.filter(a => ['milk', 'flavor', 'topping', 'extra'].includes(a.category)),
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'coffee',
    price: 3.75,
    description: 'Espresso with hot water',
    image: americano,
    addons: addons.filter(a => ['milk', 'extra'].includes(a.category)),
  },
  
  // Pastries
  {
    id: 'bagel',
    name: 'Fresh Bagel',
    category: 'pastries',
    price: 3.00,
    description: 'Freshly baked bagel with cream cheese',
    image: bagel,
  },
  {
    id: 'everything-bagel',
    name: 'Everything Bagel',
    category: 'pastries',
    price: 3.25,
    description: 'Bagel topped with seeds and spices',
    image: everythingBagel,
  },
  {
    id: 'blueberry-bagel',
    name: 'Blueberry Bagel',
    category: 'pastries',
    price: 3.50,
    description: 'Sweet bagel with blueberries',
    image: blueberryBagel,
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    category: 'pastries',
    price: 3.50,
    description: 'Flaky, buttery French croissant',
    image: croissant,
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    category: 'pastries',
    price: 3.75,
    description: 'French chocolate croissant',
    image: painAuChocolat,
  },
  {
    id: 'cinnamon-roll',
    name: 'Cinnamon Roll',
    category: 'pastries',
    price: 4.00,
    description: 'Soft roll with cinnamon and cream cheese frosting',
    image: cinnamonRoll,
  },
  {
    id: 'danish',
    name: 'Fruit Danish',
    category: 'pastries',
    price: 3.75,
    description: 'Flaky pastry with fruit and cream cheese',
    image: danish,
  },
  {
    id: 'glazed-donut',
    name: 'Glazed Donut',
    category: 'pastries',
    price: 2.50,
    description: 'Classic donut with sweet glaze',
    image: glazedDonut,
  },
  {
    id: 'chocolate-donut',
    name: 'Chocolate Donut',
    category: 'pastries',
    price: 2.75,
    description: 'Chocolate frosted donut with sprinkles',
    image: chocolateDonut,
  },
  
  // Desserts
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    category: 'desserts',
    price: 5.50,
    description: 'Italian coffee-flavored dessert',
    image: tiramisu,
  },
  {
    id: 'cheesecake',
    name: 'New York Cheesecake',
    category: 'desserts',
    price: 6.00,
    description: 'Creamy cheesecake with strawberry topping',
    image: cheesecake,
  },
  {
    id: 'strawberry-tart',
    name: 'Strawberry Tart',
    category: 'desserts',
    price: 5.75,
    description: 'Fresh strawberries on pastry cream',
    image: strawberryTart,
  },
  {
    id: 'brownie',
    name: 'Chocolate Brownie',
    category: 'desserts',
    price: 3.50,
    description: 'Rich, fudgy chocolate brownie',
    image: brownie,
  },
  {
    id: 'cookies',
    name: 'Chocolate Chip Cookies',
    category: 'desserts',
    price: 2.50,
    description: 'Homemade chocolate chip cookies (3 pcs)',
    image: cookies,
  },
  
  // Drinks
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'drinks',
    price: 4.00,
    description: 'Rich Belgian chocolate drink',
    image: hotChocolate,
    addons: addons.filter(a => ['milk', 'topping'].includes(a.category)),
  },
  {
    id: 'lemonade',
    name: 'Fresh Lemonade',
    category: 'drinks',
    price: 3.50,
    description: 'Refreshing homemade lemonade',
    image: lemonade,
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    category: 'drinks',
    price: 3.25,
    description: 'Chilled black tea with lemon',
    image: icedTea,
  },
  
  // Pasta
  {
    id: 'red-pasta',
    name: 'Marinara Pasta',
    category: 'pasta',
    price: 8.50,
    description: 'Classic tomato sauce pasta with fresh basil',
    image: redPasta,
    addons: addons.filter(a => a.category === 'pasta-addon'),
  },
  {
    id: 'white-pasta',
    name: 'Alfredo Pasta',
    category: 'pasta',
    price: 9.00,
    description: 'Creamy white sauce pasta with parmesan',
    image: whitePasta,
    addons: addons.filter(a => a.category === 'pasta-addon'),
  },
  {
    id: 'pink-pasta',
    name: 'Rosa Pasta',
    category: 'pasta',
    price: 8.75,
    description: 'Pink vodka sauce pasta with cream and tomato',
    image: pinkPasta,
    addons: addons.filter(a => a.category === 'pasta-addon'),
  },
];

export const coupons = [
  { code: 'WELCOME10', discount: 10, type: 'percentage' as const },
  { code: 'CAFE15', discount: 15, type: 'percentage' as const },
  { code: 'SAVE5', discount: 5, type: 'fixed' as const },
];

export const MEMBERSHIP_DISCOUNT = 10; // 10% discount for members
