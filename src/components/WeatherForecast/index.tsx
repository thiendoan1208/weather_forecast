import { HourlyCoord, WeatherEntry } from '@/Service/types/hourly-weather-config';
import { fetchHourlyTemp } from '@/Service/weather';
import { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Droplet, Wind } from 'lucide-react';

function WeatherForecast({ lat, lon }: HourlyCoord) {
  const [filterInfo, setFilterInfo] = useState<WeatherEntry[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getHourlyWeather = async () => {
      try {
        const res = await fetchHourlyTemp(lat, lon, signal);
        modifyInfo(res.list);
      } catch (error) {
        console.log(error);
      }
    };

    getHourlyWeather();

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modifyInfo = (data: WeatherEntry[]) => {
    const perDayInfo = data.filter((item) => item.dt_txt.includes('12:00:00'));
    setFilterInfo(perDayInfo);
  };

  const rebuildTemp = (temp: number): number => {
    return Math.round(temp - 273.15);
  };

  const rebuildTime = (time: string): string => {
    const reDate = new Date(time.split(' ')[0]);
    const formattedDate = reDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
    });
    return formattedDate;
  };

  const rebuildDes = (des: string): string => {
    const renewDes = des.split('');
    return renewDes[0].toUpperCase();
  };

  const sliceDes = (des: string): string => {
    const renewDes = des.split('');
    const slice = renewDes.slice(1, renewDes.length);
    return slice.join('');
  };

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          {filterInfo.map((item, index) => (
            <Card
              key={`forecast-${index}`}
              className="flex flex-col justify-center md:justify-between md:flex-row px-5 py-5 my-3"
            >
              <div className="text-center md:text-left">
                <p className="font-bold">{rebuildTime(item.dt_txt)}</p>
                <p className="text-muted-foreground">{`${rebuildDes(item.weather[0].description)}${sliceDes(
                  item.weather[0].description,
                )}`}</p>
              </div>
              <div className="flex justify-center items-center md:justify-between">
                <div className="flex">
                  <div className="flex items-center text-blue-500 md:mx-3">
                    <ArrowDown className="w-5 h-5" />
                    <p>{rebuildTemp(item.main.temp_min)}°C</p>
                  </div>
                  <div className="flex items-center text-red-500 mx-3">
                    <ArrowUp className="w-5 h-5" />
                    <p>{rebuildTemp(item.main.temp_max)}°C</p>
                  </div>
                </div>
                <div className="mr-2">
                  <p className="text-muted-foreground">|</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center ">
                    <Droplet className="w-4 h-4 text-blue-500 mr-0.5" />
                    <p>{item.main.humidity}%</p>
                  </div>
                  <div className="flex items-center ">
                    <Wind className="w-4 h-4 text-green-500 mr-0.5" />
                    <p>{item.wind.speed}m/s</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherForecast;
