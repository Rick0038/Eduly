import { Hero } from '../HomePageComponents/Hero';
import { FeatureCards } from '../HomePageComponents/FeatureCards';
import { UserCounts } from '../HomePageComponents/UserCounts';
import { Testimonials } from '../HomePageComponents/Testimonials';
import { TutorAd } from '../HomePageComponents/TutorAd';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <UserCounts />
      <Testimonials />
      <TutorAd />
    </>
  );
}
