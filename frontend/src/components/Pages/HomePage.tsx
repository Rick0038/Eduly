import { Hero } from './HomePageComponents/HomepageHero';
import { FeaturesCards } from './HomePageComponents/FeaturesCards';
import { UserCounts } from './HomePageComponents/UserCounts';
import { Testimonials } from './HomePageComponents/Testimonials';
import { Tutorad } from './HomePageComponents/Tutorad';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesCards />
      <UserCounts />
      <Testimonials />
      <Tutorad />
    </>
  );
}
