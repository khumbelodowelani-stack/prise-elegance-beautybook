import { Link } from 'react-router-dom';

const categoryImages = [
  {
    id: 'acrylic',
    name: 'Acrylic Nails',
    description: 'Long-lasting, customizable nail extensions',
    emoji: '💎',
  },
  {
    id: 'gel',
    name: 'Gel Nails',
    description: 'Glossy, flexible, natural-looking finish',
    emoji: '✨',
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    description: 'Pamper your feet with luxury treatments',
    emoji: '👣',
  },
  {
    id: 'extras',
    name: 'Glam Services',
    description: 'Complete beauty transformations',
    emoji: '👑',
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Service Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From classic manicures to elaborate nail art, we offer a full range of beauty services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryImages.map((category, index) => (
            <Link
              key={category.id}
              to={`/services?category=${category.id}`}
              className="group relative aspect-[4/5] bg-primary rounded-lg overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </span>
                <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-primary-foreground/70">
                  {category.description}
                </p>
              </div>
              
              <div className="absolute inset-0 border-2 border-primary-foreground/0 group-hover:border-primary-foreground/30 rounded-lg transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
