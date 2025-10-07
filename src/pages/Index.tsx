import { useState } from 'react';
import { MenuItem, CartItem, Addon } from '@/types/menu';
import { menuItems } from '@/data/menuData';
import { MenuItemCard } from '@/components/cafe/MenuItemCard';
import { CustomizeModal } from '@/components/cafe/CustomizeModal';
import { CartSheet } from '@/components/cafe/CartSheet';
import { CheckoutPage } from '@/components/cafe/CheckoutPage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Coffee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-coffee.jpg';

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (item: MenuItem) => {
    if (item.addons && item.addons.length > 0) {
      setSelectedItem(item);
    } else {
      addToCart(item, []);
    }
  };

  const addToCart = (item: MenuItem, addons: Addon[]) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        cartItem => 
          cartItem.menuItem.id === item.id && 
          JSON.stringify(cartItem.selectedAddons) === JSON.stringify(addons)
      );

      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }

      return [...prev, { menuItem: item, quantity: 1, selectedAddons: addons }];
    });

    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart`,
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].quantity += delta;
      if (newCart[index].quantity <= 0) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const removeItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed! 🎉",
      description: "Your delicious order is being prepared",
    });
    setCart([]);
    setIsCheckout(false);
  };

  if (isCheckout) {
    return (
      <CheckoutPage
        cart={cart}
        onBack={() => setIsCheckout(false)}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Cozy Cafe" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coffee className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground drop-shadow-lg">
              Cozy Cafe
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
              Artisan coffee, fresh pastries, and delightful treats
            </p>
            <Badge variant="secondary" className="text-base px-4 py-2">
              🎉 Members save 10% on every order!
            </Badge>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-playfair font-bold">Our Menu</h2>
          <Button
            size="lg"
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Cart
            {cartItemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>

        <Tabs defaultValue="coffee" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-[700px]">
            <TabsTrigger value="coffee">Coffee</TabsTrigger>
            <TabsTrigger value="pastries">Pastries</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
            <TabsTrigger value="pasta">Pasta</TabsTrigger>
          </TabsList>

          {(['coffee', 'pastries', 'desserts', 'drinks', 'pasta'] as const).map(category => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <CustomizeModal
        item={selectedItem}
        open={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onConfirm={(addons) => {
          if (selectedItem) {
            addToCart(selectedItem, addons);
          }
          setSelectedItem(null);
        }}
      />

      <CartSheet
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckout(true);
        }}
      />
    </div>
  );
};

export default Index;
