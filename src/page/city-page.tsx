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

import { useParams } from 'react-router-dom';
import { useState, useEffect, SetStateAction } from 'react';
import { fetchSearchWeatherResult } from '@/Service/weather';

// src
import CurrentWeatherConfig from '@/Service/types/current-weather-config';

// Component
import CurrentWeather from '@/components/CurrentWeatherCard';
import HourlyTemp from '@/components/HourlyTemp';
import WeatherDetail from '@/components/WeatherDetail';
import WeatherForecast from '@/components/WeatherForecast';

function CityPage() {
  const { cityname } = useParams();
  const [data, setData] = useState<CurrentWeatherConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorWhenFetching, setIsErrorWhenFetching] = useState(false);

  // get city location
  useEffect(() => {
    handleCurrentWeather(cityname);
  }, [cityname]);

  // fetch city location
  const handleCurrentWeather = async (cityname: SetStateAction<string> | undefined) => {
    try {
      setIsLoading(true);
      const res = await fetchSearchWeatherResult(cityname ? cityname : '');
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
                <AlertDialogTitle>Error</AlertDialogTitle>
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
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex gap-1">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tighter">{data?.name},</h2>
              </div>
              <p className="text-sm text-muted-foreground">{data?.sys.country}</p>
            </div>
            <Button
              onClick={() => {
                handleCurrentWeather(cityname);
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
              <div className="grid gap-6">
                <div className="flex flex-col lg:flex-row gap-2">
                  <CurrentWeather data={data} />
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
            <>
              <Skeleton className="h-[125px] w-[100%] rounded-xl" />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CityPage;
