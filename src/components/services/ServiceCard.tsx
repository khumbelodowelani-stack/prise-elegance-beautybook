import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Service } from '@/data/services';
import { useCart } from '@/context/CartContext';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export const ServiceCard = ({ service, index = 0 }: ServiceCardProps) => {
  const { addToCart, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
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
    <div 
      className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Placeholder */}
      <div className="aspect-square bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">💅</span>
            </div>
            <p className="text-xs text-muted-foreground">Image coming soon</p>
          </div>
        </div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
          {getCategoryLabel(service.category)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg text-foreground">
            {formatPrice(service.price, service.priceMax)}
          </span>
          
          <Button
            size="sm"
            variant={isInCart ? 'secondary' : 'default'}
            onClick={handleAddToCart}
            className="transition-all duration-200"
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
