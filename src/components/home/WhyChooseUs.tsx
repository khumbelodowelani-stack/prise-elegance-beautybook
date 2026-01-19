import { Sparkles, Heart, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'We use only the finest products and materials for stunning, long-lasting results.',
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    description: 'Every client receives individual attention and customized treatments.',
  },
  {
    icon: Clock,
    title: 'Convenient Booking',
    description: 'Easy WhatsApp booking with flexible appointment times to suit your schedule.',
  },
  {
    icon: Award,
    title: 'Expert Techniques',
    description: 'Years of experience combined with the latest trends and techniques.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
            The Prise Elegance Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 bg-card rounded-lg border border-border animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
