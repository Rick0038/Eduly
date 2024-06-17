import { Hero } from '../HomepageHero';
import { FeaturesCards } from '../FeaturesCards';
import { UserCounts } from '../UserCounts';
import { Testimonials } from '../Testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesCards />
      <UserCounts />
      <Testimonials />
    </>
  );
}
