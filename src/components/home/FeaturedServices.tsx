import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/services/ServiceCard';
import { services } from '@/data/services';

export const FeaturedServices = () => {
  // Show a selection of popular services
  const featuredServices = services.filter((s) =>
    ['acrylic-plain-medium', 'acrylic-french-medium', 'gel-plain-overlay', 'pedi-plain-gel', 'extra-soft-glam', 'extra-full-glam'].includes(s.id)
  );

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Popular Treatments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most loved nail services, crafted with precision and care to make you feel beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button variant="outline" size="lg" className="text-base">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
