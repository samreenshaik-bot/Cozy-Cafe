import { useState } from 'react';
import { CartItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { coupons, MEMBERSHIP_DISCOUNT } from '@/data/menuData';
import { ArrowLeft, Check, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutPageProps {
  cart: CartItem[];
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const CheckoutPage = ({ cart, onBack, onPlaceOrder }: CheckoutPageProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [hasMembership, setHasMembership] = useState(false);
  const { toast } = useToast();

  const subtotal = cart.reduce((sum, item) => {
    const addonPrice = item.selectedAddons.reduce((addonSum, addon) => addonSum + addon.price, 0);
    return sum + (item.menuItem.price + addonPrice) * item.quantity;
  }, 0);

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      toast({
        title: "Coupon Applied!",
        description: `${coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`} discount added`,
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please check your coupon code and try again",
        variant: "destructive",
      });
    }
  };

  const couponDiscount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? subtotal * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0;

  const membershipDiscount = hasMembership ? subtotal * (MEMBERSHIP_DISCOUNT / 100) : 0;
  const totalDiscount = couponDiscount + membershipDiscount;
  const total = subtotal - totalDiscount;

  return (
    <div className="min-h-screen bg-gradient-warm py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium">
                      {item.quantity}x {item.menuItem.name}
                    </p>
                    {item.selectedAddons.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        + {item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold">
                    ${((item.menuItem.price + item.selectedAddons.reduce((sum, a) => sum + a.price, 0)) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Discounts & Total */}
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">Discounts & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Membership Toggle */}
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="membership" className="text-base font-semibold">
                    Member Discount
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Save {MEMBERSHIP_DISCOUNT}% on all orders
                  </p>
                </div>
                <Switch
                  id="membership"
                  checked={hasMembership}
                  onCheckedChange={setHasMembership}
                />
              </div>

              {/* Coupon Code */}
              <div className="space-y-2">
                <Label htmlFor="coupon">Coupon Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="coupon"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <Button onClick={applyCoupon} variant="secondary">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                {appliedCoupon && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    {appliedCoupon.code} Applied
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground">
                  Try: WELCOME10, CAFE15, or SAVE5
                </p>
              </div>

              <Separator />

              {/* Final Calculation */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {hasMembership && (
                  <div className="flex justify-between text-sm text-accent">
                    <span>Member Discount ({MEMBERSHIP_DISCOUNT}%):</span>
                    <span>-${membershipDiscount.toFixed(2)}</span>
                  </div>
                )}
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-accent">
                    <span>Coupon Discount:</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <p className="text-sm text-accent text-center">
                    You saved ${totalDiscount.toFixed(2)}! 🎉
                  </p>
                )}
              </div>

              <Button onClick={onPlaceOrder} className="w-full" size="lg">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
