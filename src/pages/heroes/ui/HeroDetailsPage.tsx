import HeroDetails from '../../../features/hero-details/ui/HeroDetails';

export const HeroDetailsPage = () => {
  return (
    <div>
      <h1 className="w-full text-center text-5xl font-bold uppercase pt-10">Hero</h1>
      <main className="md:w-3/4 mx-auto">
        <HeroDetails />
      </main>
    </div>
  );
};
