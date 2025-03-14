import { HourlyCoord, WeatherEntry } from '@/Service/types/hourly-weather-config';
import { fetchHourlyTemp } from '@/Service/weather';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function WeatherForecast({ lat, lon }: HourlyCoord) {
  const [filterInfo, setFilterInfo] = useState<WeatherEntry[]>([]);

  useEffect(() => {
    getHourlyWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHourlyWeather = async () => {
    try {
      const res = await fetchHourlyTemp(lat, lon);
      modifyInfo(res.list);
    } catch (error) {
      console.log(error);
    }
  };

  const modifyInfo = (data: WeatherEntry[]) => {
    const perDayInfo = data.filter((item) => item.dt_txt.includes('12:00:00'));
    setFilterInfo(perDayInfo);
  };

  return (
    <div>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Card>
            {filterInfo.map((item) => (
              <div>
                <p>{item.dt_txt}</p>
                <p>{item.weather[0].description}</p>
                <p>{item.main.temp_min}</p>
                <p>{item.main.temp_max}</p>
                <p>{item.main.humidity}</p>
                <p>{item.wind.speed}</p>
              </div>
            ))}
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherForecast;
