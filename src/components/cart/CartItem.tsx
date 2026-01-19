import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, updateNotes, removeFromCart } = useCart();

  const formatPrice = (price: number, priceMax?: number) => {
    if (priceMax) {
      return `R${price} – R${priceMax}`;
    }
    return `R${price}`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border">
      {/* Image Placeholder */}
      <div className="w-full sm:w-24 h-24 bg-secondary rounded-md flex items-center justify-center shrink-0">
        <span className="text-2xl">💅</span>
      </div>

      {/* Details */}
      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-serif font-semibold text-foreground">
              {item.service.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {formatPrice(item.service.price, item.service.priceMax)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(item.service.id)}
            className="text-muted-foreground hover:text-destructive shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Qty:</span>
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.service.id, parseInt(e.target.value) || 1)
              }
              className="w-12 h-8 text-center border-0 focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="ml-auto font-semibold">
            R{item.service.price * item.quantity}
          </span>
        </div>

        {/* Notes */}
        <Textarea
          placeholder="Add notes (e.g., preferred length, design reference)..."
          value={item.notes}
          onChange={(e) => updateNotes(item.service.id, e.target.value)}
          className="text-sm resize-none"
          rows={2}
        />
      </div>
    </div>
  );
};
