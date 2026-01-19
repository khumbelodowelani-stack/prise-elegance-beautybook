import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceFilters } from '@/components/services/ServiceFilters';
import { services, priceRanges } from '@/data/services';

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

  const filteredServices = useMemo(() => {
    let result = [...services];

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
  }, [filters, sortBy]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Browse our complete collection of nail and beauty services. 
              Add your favorites to cart and book via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10">
        <div className="container">
          <div className="flex gap-8">
            <ServiceFilters
              filters={filters}
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={filteredServices.length}
            />

            <div className="flex-1">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredServices.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground mb-2">No services found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
