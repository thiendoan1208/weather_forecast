import { API_KEY } from './api-key.ts';

import axios from './customize-axios.tsx';

import CurrentWeatherConfig from './types/current-weather-config.ts';
import { HourlyWeather } from './types/hourly-weather-config.ts';
import { SetStateAction } from 'react';

const fetchCurrentCityWeather = (lat: number | undefined, lon: number | undefined): Promise<CurrentWeatherConfig> => {
  return axios.get(`/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
};

const fetchHourlyTemp = (lat: number | undefined, lon: number | undefined, signal: AbortSignal): Promise<HourlyWeather> => {
  return axios.get(`/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`, { signal });
};

const fetchSearchWeatherResult = async (name: SetStateAction<string>): Promise<CurrentWeatherConfig | null> => {
  if (name.length < 3) return null;
  return axios.get(`/weather?q=${name}&appid=${API_KEY}`);
};

export { fetchCurrentCityWeather, fetchHourlyTemp, fetchSearchWeatherResult };
