import { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Service } from '@/data/services';
import { useCart } from '@/context/CartContext';

interface ServiceCardProps {
  service: Service;
  index?: number;
  onViewDetails?: (service: Service) => void;
}

export const ServiceCard = ({ service, index = 0, onViewDetails }: ServiceCardProps) => {
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
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 animate-fade-in flex flex-col"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">💅</span>
            </div>
            <p className="text-xs text-muted-foreground">Image coming soon</p>
          </div>
        </div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full shadow-sm">
          {getCategoryLabel(service.category)}
        </span>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails?.(service)}
          className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background shadow-sm"
        >
          <Eye className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors text-lg">
          {service.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {service.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
          <span className="font-semibold text-lg text-foreground">
            {formatPrice(service.price, service.priceMax)}
          </span>
          
          <Button
            size="sm"
            variant={isInCart ? 'secondary' : 'default'}
            onClick={handleAddToCart}
            className="transition-all duration-200 shrink-0"
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
