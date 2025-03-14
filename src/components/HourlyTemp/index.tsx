import { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { HourlyCoord } from '@/Service/types/hourly-weather-config';
import { fetchHourlyTemp } from '@/Service/weather';


function HourlyTemp({ lat, lon }: HourlyCoord) {
  const [hourlyinFo, setHourlyinFo] = useState<object[]>();

  useEffect(() => {
    getHourlyWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHourlyWeather = async () => {
    try {
      const res = await fetchHourlyTemp(lat, lon);
      const chartData = res.list.map((item) => ({
        date: item.dt_txt,
        Temp: Math.round(item.main.temp - 273.15),
        feelLike: Math.round(item.main.feels_like - 273.15),
      }));
      setHourlyinFo(chartData.slice(0, 11));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="flex-1 my-2">
      <CardHeader>
        <CardTitle>Tomorrow's Temperature</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyinFo} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="Temp" stroke="#8884d8" />
            <Line type="monotone" dataKey="feelLike" stroke="#e82768" />
            <XAxis className='text-[12px]' dataKey="date" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length && label) {
                  return (
                    <div className="border bg-background shadow-sm px-3 py-1 rounded-2xl text-[12px] space-y-1">
                      <div>
                        <p>{`Date: ${label}`}</p>
                      </div>
                      <div className='flex gap-2'>
                        <div>
                          <p className='text-muted-foreground tracking-wide'>TEMPERATURE</p>
                          <p className='text-blue-500'>{`${payload[0].value}°C`}</p>
                        </div>
                        <div>
                          <p className='text-muted-foreground tracking-wide'>FEELS LIKE</p>
                          <p className='text-pink-400'>{`${payload[1].value}°C`}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default HourlyTemp;
