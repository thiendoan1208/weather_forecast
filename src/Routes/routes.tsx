import WeatherDashboard from '@/page/weather-dashboard';
import CityPage from '@/page/city-page';
import { NotFound } from '@/components/NotFound';

const publicRoute = [
  { path: '/', component: <WeatherDashboard /> },
  { path: '/city/:cityname', component: <CityPage /> },
  { path: '*', component: <NotFound /> },
];

export default publicRoute;
