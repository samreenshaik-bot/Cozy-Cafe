import { useState } from 'react';
import { MenuItem, Addon } from '@/types/menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CustomizeModalProps {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedAddons: Addon[]) => void;
}

export const CustomizeModal = ({ item, open, onClose, onConfirm }: CustomizeModalProps) => {
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  if (!item) return null;

  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      // For milk category, allow only one selection
      if (addon.category === 'milk') {
        return [...prev.filter(a => a.category !== 'milk'), addon];
      }
      return [...prev, addon];
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedAddons);
    setSelectedAddons([]);
    onClose();
  };

  const addonsByCategory = item.addons?.reduce((acc, addon) => {
    if (!acc[addon.category]) {
      acc[addon.category] = [];
    }
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, Addon[]>) || {};

  const totalAddonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Customize Your {item.name}</DialogTitle>
          <DialogDescription>
            Select your preferred add-ons to personalize your order
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(addonsByCategory).map(([category, addons]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-3 capitalize">{category} Options</h3>
              <div className="space-y-3">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div key={addon.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Checkbox
                        id={addon.id}
                        checked={isSelected}
                        onCheckedChange={() => handleAddonToggle(addon)}
                      />
                      <Label
                        htmlFor={addon.id}
                        className="flex-1 cursor-pointer flex justify-between items-center"
                      >
                        <span>{addon.name}</span>
                        <span className="font-medium text-primary">
                          {addon.price > 0 ? `+$${addon.price.toFixed(2)}` : 'Free'}
                        </span>
                      </Label>
                    </div>
                  );
                })}
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </div>

        <DialogFooter className="flex flex-col gap-3">
          <div className="flex justify-between items-center w-full px-1">
            <span className="text-sm text-muted-foreground">Total with add-ons:</span>
            <span className="text-xl font-semibold text-primary">
              ${(item.price + totalAddonPrice).toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              Add to Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
