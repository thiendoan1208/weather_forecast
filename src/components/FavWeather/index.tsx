import { XIcon } from 'lucide-react';
import { Card } from '../ui/card';
import './customize-fav-scrollbar.css';
import useFav from '@/Hook/useFavourite';
import { fetchSearchWeatherResult } from '@/Service/weather';
import { SetStateAction, useEffect, useState } from 'react';
import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface allWeatherData {
  status: string;
  value: CurrentWeatherConfig;
}

function FavWeather() {
  const { favItem, deleteRenderResult } = useFav('fav-item');
  const [allResults, setAllResult] = useState<allWeatherData[]>([]);

  useEffect(() => {
    fetchAllCitiesWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEachCityWeather = async (city: SetStateAction<string>) => {
    try {
      const res = await fetchSearchWeatherResult(city);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCitiesWeather = async () => {
    try {
      const result = await Promise.allSettled(favItem.map((item) => fetchEachCityWeather(item.cityInfo)));
      const formatResult: allWeatherData[] = result.map((item) => {
        if (item.status === 'fulfilled') {
          return { status: item.status, value: item.value as CurrentWeatherConfig };
        } else {
          return { status: item.status, value: {} as CurrentWeatherConfig };
        }
      });
      setAllResult(formatResult);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTemp = (temp: number | undefined): string => {
    if (temp === undefined) {
      return `N/A`;
    } else {
      return `${Math.round(temp - 273.15)}°C`;
    }
  };

  const handleDeleteFavCity = (name: string) => {
    deleteRenderResult(name);
    setAllResult((prev) => prev.filter((item) => item.value.name !== name));
  };

  return (
    <div>
      {favItem.length > 0 ? (
        <div>
          <p className="text-xl font-bold tracking-tight">Favorites</p>
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex overflow-auto space-x-4 customize-scrollbar-section mb-2">
        {allResults.map((item, index) => (
          <div key={`city-${index}`} className="min-w-72">
            <Card className="w-full my-3 py-4 px-3 relative">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-10 h-10 -ml-3">
                  <img
                    className="w-full object-cover object-center"
                    src={`https://openweathermap.org/img/wn/${item.value.weather[0].icon}@4x.png`}
                    alt="weather-icon"
                  />
                </div>
                <div>
                  <p className="font-bold">{item.value.name}</p>
                  <p className="text-muted-foreground text-sm">{item.value.sys.country}</p>
                </div>
                <div className="">
                  <p className="font-bold text-lg">{formatTemp(item.value.main.temp)}</p>
                  <p className="text-muted-foreground text-sm">{item.value.weather[0].description}</p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <XIcon className="absolute right-2 top-2 w-4 h-4 cursor-pointer">Show Dialog</XIcon>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will remove this city from your favorite city list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleDeleteFavCity(item.value.name);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavWeather;
