import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';

function WeatherDetail({ data }: { data: CurrentWeatherConfig }) {
  const formatSun = (sunInfo: number): string => {
    const reBuild = new Date(sunInfo * 1000);
    return reBuild.toLocaleString();
  };

  const windDirection: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const formatWind = (windInfo: number): string => {
    if (windInfo < 360) {
      const reBuild = Math.round(windInfo / 45);
      return windDirection[reBuild];
    } else {
      return 'N';
    }
  };

  const details = [
    {
      name: 'Sunrise',
      value: formatSun(data.sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      name: 'Sunset',
      value: formatSun(data.sys.sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
    {
      name: 'Wind Direction',
      value: `${formatWind(data.wind.deg)} (${data.wind.deg}°)`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      name: 'Pressure',
      value: `${data.main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {details.map((item, index) => (
              <Card key={`detail-${index}`} className="flex flex-row items-center gap-2.5">
                <div className="ml-4">
                  <item.icon className={`${item.color}`} />
                </div>
                <div className="mr-4">
                  <p className="font-bold tracking-wide">{item.name}</p>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherDetail;

{
  /* <p>{data.sys.sunrise}</p>
    <p>{data.sys.sunset}</p>
    <p>{data.wind.deg}</p>
    <p>{data.main.pressure}</p> */
}
