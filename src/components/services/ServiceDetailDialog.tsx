import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { Service } from '@/data/services';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ServiceDetailDialogProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceDetailDialog = ({
  service,
  open,
  onOpenChange,
}: ServiceDetailDialogProps) => {
  const { addToCart, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!service) return null;

  const isInCart = items.some((item) => item.service.id === service.id);

  const handleAddToCart = () => {
    addToCart(service);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const formatPrice = (price: number, priceMax?: number) => {
    if (priceMax) {
      return `R${price} – R${priceMax}`;
    }
    return `R${price}`;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      acrylic: 'Acrylic',
      gel: 'Gel',
      pedicure: 'Pedicure',
      maintenance: 'Maintenance',
      decor: 'Add-On',
      extras: 'Extra',
    };
    return labels[category] || category;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{service.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image */}
          <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">💅</span>
              </div>
              <p className="text-sm text-muted-foreground">Image coming soon</p>
            </div>
          </div>

          {/* Category Badge */}
          <div>
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
              {getCategoryLabel(service.category)}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Details */}
          <div className="flex flex-wrap gap-2">
            {service.style && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                {service.style}
              </span>
            )}
            {service.length && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                {service.length}
              </span>
            )}
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="font-semibold text-2xl text-foreground">
              {formatPrice(service.price, service.priceMax)}
            </span>

            <Button
              size="lg"
              variant={isInCart ? 'secondary' : 'default'}
              onClick={handleAddToCart}
              className="transition-all duration-200"
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
