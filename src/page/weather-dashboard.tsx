// Shadcn UI
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Lucide React
import { RefreshCw } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

// React
import { useEffect, useState } from 'react';

// src
import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import { fetchCurrentCityWeather } from '@/Service/weather';

// Component
import CurrentWeather from '@/components/CurrentWeatherCard';
import HourlyTemp from '@/components/HourlyTemp';
import WeatherDetail from '@/components/WeatherDetail';
import WeatherForecast from '@/components/WeatherForecast';
import FavWeather from '@/components/FavWeather';

function WeatherDashboard() {
  const [data, setData] = useState<CurrentWeatherConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorWhenFetching, setIsErrorWhenFetching] = useState(false);
  const [errorWhenNoLocation, setErrorWhenNoLocation] = useState('');

  // get user location
  useEffect(() => {
    const storedCoords = localStorage.getItem('userCoord');
    if (storedCoords) {
      const { lat, lon } = JSON.parse(storedCoords);
      handleCurrentWeather(lat, lon);
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('userCoord', JSON.stringify({ lat: latitude, lon: longitude }));
          handleCurrentWeather(latitude, longitude);
        },
        (error) => {
          setIsError(true);
          setErrorWhenNoLocation(error.message);
        },
      );
    }
  }, []);

  // fetch current user location
  const handleCurrentWeather = async (lat: number | undefined, lon: number | undefined) => {
    try {
      setIsLoading(true);
      const res = await fetchCurrentCityWeather(lat, lon);
      setData(res);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsErrorWhenFetching(true);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      {isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {isErrorWhenFetching ? 'Error when trying to get local weather' : 'Please grant access to your location'}
          </AlertDescription>
          {/* Dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {isErrorWhenFetching ? (
                <Button className="min-w-20 my-2 cursor-pointer" variant="outline">
                  Dialog
                </Button>
              ) : (
                <Button className="min-w-30 my-2 cursor-pointer" variant="outline">
                  Enable location
                </Button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{errorWhenNoLocation}</AlertDialogTitle>
                <AlertDialogDescription>
                  {isErrorWhenFetching
                    ? 'Refresh this website may fix this problem !'
                    : ' This website need your location to provide precious of your local weather. Go to your setting, enable location and try again !'}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {isErrorWhenFetching ? (
                  <AlertDialogAction
                    onClick={() => {
                      location.reload();
                    }}
                  >
                    Refresh
                  </AlertDialogAction>
                ) : (
                  <AlertDialogAction>Close</AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Alert>
      ) : (
        <>
          <div>
            <FavWeather />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">My Location</h1>
            <Button
              onClick={() => {
                handleCurrentWeather(data?.coord.lat, data?.coord.lon);
              }}
              variant={'outline'}
              size={'icon'}
              className="cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : 'animate-none'}`} />
            </Button>
          </div>
          {!isLoading ? (
            <div>
              <div className="flex flex-col md:grid gap-6">
                <div className="flex flex-col lg:flex-row gap-2">
                  {data && <CurrentWeather data={data} />}
                  {data?.coord && <HourlyTemp lat={data?.coord.lat} lon={data?.coord.lon} />}
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  {data ? (
                    <WeatherDetail data={data} />
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>Weather Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-bold text-xl">Loading....</p>
                      </CardContent>
                    </Card>
                  )}
                  {data?.coord && <WeatherForecast lat={data?.coord.lat} lon={data?.coord.lon} />}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 md:grid-rows-2">
              <Skeleton className="h-[125px] rounded-xl" />
              <Skeleton className="h-[125px] rounded-xl" />
              <Skeleton className="h-[125px] rounded-xl" />
              <Skeleton className="h-[125px] rounded-xl" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default WeatherDashboard;
