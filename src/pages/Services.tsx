import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceFilters } from '@/components/services/ServiceFilters';
import { ServiceDetailDialog } from '@/components/services/ServiceDetailDialog';
import { services, priceRanges, Service } from '@/data/services';

interface Filters {
  categories: string[];
  styles: string[];
  lengths: string[];
  priceRange: string[];
}

const Services = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [filters, setFilters] = useState<Filters>({
    categories: initialCategory ? [initialCategory] : [],
    styles: [],
    lengths: [],
    priceRange: [],
  });
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const filteredServices = useMemo(() => {
    let result = [...services];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((s) => filters.categories.includes(s.category));
    }

    // Apply style filter
    if (filters.styles.length > 0) {
      result = result.filter((s) => s.style && filters.styles.includes(s.style));
    }

    // Apply length filter
    if (filters.lengths.length > 0) {
      result = result.filter((s) => s.length && filters.lengths.includes(s.length));
    }

    // Apply price range filter
    if (filters.priceRange.length > 0) {
      result = result.filter((s) => {
        return filters.priceRange.some((range) => {
          const rangeData = priceRanges.find((r) => r.value === range);
          if (!rangeData) return false;
          return s.price >= rangeData.min && s.price <= rangeData.max;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'popular':
      default:
        // Keep original order for popular
        break;
    }

    return result;
  }, [filters, sortBy, searchQuery]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3">
              Our Services
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/80">
              Browse our complete collection of nail and beauty services. 
              Add your favorites to cart and book via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Services Grid */}
      <section className="py-8 md:py-10">
        <div className="container">
          {/* Filters on top */}
          <div className="mb-6">
            <ServiceFilters
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={filteredServices.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filteredServices.map((service, index) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary/30 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-lg text-foreground mb-2">No services found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Service Detail Dialog */}
      <ServiceDetailDialog
        service={selectedService}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Layout>
  );
};

export default Services;
