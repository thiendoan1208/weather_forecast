import CurrentWeatherConfig from '@/Service/types/current-weather-config';
import { useState } from 'react';

function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState(() => {
    const storage = window.localStorage.getItem('search-history');
    return storage ? (JSON.parse(storage) as CurrentWeatherConfig[]) : [];
  });

  const addToHistory = (data: CurrentWeatherConfig) => {
    setSearchHistory((pre: CurrentWeatherConfig[]) => {
      const result = [...pre, data];
      localStorage.setItem('search-history', JSON.stringify(result));
      return result;
    });
  };

  const deleteEachResult = (index: string) => {
    const newnumber = parseInt(index.split('-')[1]);
    const newArray = [...searchHistory];
    newArray.splice(newnumber, 1);
    localStorage.setItem('search-history', JSON.stringify(newArray));
    setSearchHistory(newArray);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search-history');
  };

  return { searchHistory, addToHistory, deleteEachResult, clearHistory };
}

export default useSearchHistory;
