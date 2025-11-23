import { Navigate, Route, Routes } from 'react-router';
import { HeroesPage, HeroDetailsPage } from '../../pages/heroes';
import { routesConfig } from '../../shared/config';

// Application router component
export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={routesConfig.heroes} />} />
      <Route path={routesConfig.heroes} element={<HeroesPage />} />
      <Route path={routesConfig.heroDetails} element={<HeroDetailsPage />} />
    </Routes>
  );
};
