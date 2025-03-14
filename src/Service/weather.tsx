import { API_KEY } from './api-key.ts';

import axios from './customize-axios.tsx';

import CurrentWeatherConfig from './types/current-weather-config.ts';
import { HourlyWeather } from './types/hourly-weather-config.ts';

const fetchCurrentCityWeather = (lat: number | undefined, lon: number | undefined): Promise<CurrentWeatherConfig> => {
  return axios.get(`/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
};

const fetchHourlyTemp = (lat: number | undefined, lon: number | undefined): Promise<HourlyWeather> => {
  return axios.get(`/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
};

export { fetchCurrentCityWeather, fetchHourlyTemp };
