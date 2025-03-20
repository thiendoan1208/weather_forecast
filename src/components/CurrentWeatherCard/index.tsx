import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Droplet, Wind } from 'lucide-react';

import images from '@/assets';
import CurrentWeatherConfig from '@/Service/types/current-weather-config';

function CurrentWeather({ data }: { data: CurrentWeatherConfig | null }) {
  const formatTemp = (temp: number | undefined): string => {
    if (temp === undefined) {
      return `N/A`;
    } else {
      return `${Math.round(temp - 273.15)}°C`;
    }
  };

  return (
    <Card className="overflow-hidden my-2">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tighter">{data?.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{data?.sys.country}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-7xl font-bold tracking-tighter">{formatTemp(data?.main.temp)}</p>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(data?.main.feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="w-3 h-3" />
                    {formatTemp(data?.main.temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="w-3 h-3" />
                    {formatTemp(data?.main.temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidlity</p>
                  <p className="text-sm font-medium">{data?.main.humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-green-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm font-medium">{data?.wind.speed}m/s</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square max-w-[200px] items-center justify-center ">
              <img
                className="object-cover w-full h-full"
                src={
                  data?.weather[0].icon
                    ? `https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`
                    : images.PlaceholderImg
                }
                alt={data?.weather[0].description}
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">{data?.weather[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentWeather;
