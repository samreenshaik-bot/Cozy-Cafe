import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuItemCard = ({ item, onAddToCart }: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1 animate-fade-in">
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-playfair">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-primary">${item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onAddToCart(item)}
          className="w-full group"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
