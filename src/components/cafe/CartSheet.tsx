import { CartItem } from '@/types/menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartSheet = ({ open, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }: CartSheetProps) => {
  const subtotal = cart.reduce((sum, item) => {
    const addonPrice = item.selectedAddons.reduce((addonSum, addon) => addonSum + addon.price, 0);
    return sum + (item.menuItem.price + addonPrice) * item.quantity;
  }, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-playfair text-2xl flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Add some delicious items to your cart!</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-6">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-card rounded-lg border animate-scale-in">
                    <img 
                      src={item.menuItem.image} 
                      alt={item.menuItem.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.menuItem.name}</h4>
                      {item.selectedAddons.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          + {item.selectedAddons.map(a => a.name).join(', ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-secondary rounded-md p-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(index, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(index, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">
                            ${((item.menuItem.price + item.selectedAddons.reduce((sum, a) => sum + a.price, 0)) * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onRemoveItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <Button 
                onClick={onCheckout} 
                className="w-full" 
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
