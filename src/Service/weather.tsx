import axios from './customize-axios.tsx';
import { API_KEY } from './api-key.ts';
import CurrentWeatherConfig from './types/current-weather-config.ts';

const fetchCurrentCityWeather = (lat: number | undefined, lon: number | undefined): Promise<CurrentWeatherConfig> => {
  return axios.get(`/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
};

export { fetchCurrentCityWeather };
