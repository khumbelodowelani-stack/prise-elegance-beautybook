import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedServices />
      <CategoryShowcase />
      <WhyChooseUs />
    </Layout>
  );
};

export default Index;
