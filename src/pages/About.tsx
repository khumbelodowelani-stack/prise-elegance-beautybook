import { Layout } from '@/components/layout/Layout';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients' },
  { icon: Award, value: '5+', label: 'Years Experience' },
  { icon: Heart, value: '1000+', label: 'Nails Done' },
  { icon: Sparkles, value: '100%', label: 'Quality Products' },
];

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About Prise Elegance
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Where beauty meets artistry. We transform nails into works of art.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">💅</span>
                <p className="mt-4 text-sm text-muted-foreground">Owner Photo</p>
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Passion for Perfection
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Prise Elegance was born from a deep passion for nail artistry and a commitment 
                  to making every client feel beautiful and confident. What started as a dream 
                  has blossomed into a trusted name in nail and beauty services.
                </p>
                <p>
                  We believe that nails are more than just an accessory – they're an expression 
                  of your personality and style. That's why we take the time to understand your 
                  preferences and create custom designs that reflect who you are.
                </p>
                <p>
                  Using only premium products and staying current with the latest trends and 
                  techniques, we ensure that every service delivers exceptional results that 
                  last.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-sm text-muted-foreground">
                We never compromise on the quality of our products or services. 
                Your nails deserve the best.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💖</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Client Care</h3>
              <p className="text-sm text-muted-foreground">
                Every client is unique and special. We treat you with warmth, 
                respect, and personalized attention.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Creative Excellence</h3>
              <p className="text-sm text-muted-foreground">
                From classic styles to intricate art, we bring creativity 
                and skill to every design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
