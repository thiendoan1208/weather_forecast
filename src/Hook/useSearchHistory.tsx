import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import { useState } from 'react';

function useSearchHistory(key: string) {
  const [searchHistory, setSearchHistory] = useState(() => {
    const storage = window.localStorage.getItem(key);
    return storage ? (JSON.parse(storage) as CurrentWeatherConfig[]) : [];
  });

  const addToHistory = (data: CurrentWeatherConfig) => {
    if (searchHistory.length > 0) {
      console.log(1);
      for (let i = 0; i < searchHistory.length; i++) {
        if (data.name != searchHistory[i].name) {
          setSearchHistory((pre: CurrentWeatherConfig[]) => {
            const result = [...pre, data];
            localStorage.setItem(key, JSON.stringify(result));
            return result;
          });
          break;
        } else {
          break;
        }
      }
    } else {
      console.log(0);
      setSearchHistory((pre: CurrentWeatherConfig[]) => {
        const result = [...pre, data];
        localStorage.setItem(key, JSON.stringify(result));
        return result;
      });
    }
  };

  const deleteEachResult = (index: string) => {
    const newnumber = parseInt(index.split('-')[1]);
    const newArray = [...searchHistory];
    newArray.splice(newnumber, 1);
    localStorage.setItem(key, JSON.stringify(newArray));
    setSearchHistory(newArray);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(key);
  };

  return { searchHistory, addToHistory, deleteEachResult, clearHistory };
}

export default useSearchHistory;
