export interface HourlyCoord {
  lat: number;
  lon: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number; // Có thể không có
  grnd_level?: number;
  temp_kf?: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

interface Rain {
  '3h'?: number; // API có thể không trả về nếu không có mưa
}

interface Clouds {
  all: number;
}

interface Sys {
  pod: string;
}

interface WeatherEntry {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain; // Có thể không có
  sys: Sys;
  dt_txt: string;
}

interface City {
  id: number;
  name: string;
  coord: HourlyCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface HourlyWeather {
  list: WeatherEntry[];
  city: City;
}
