import { useState } from 'react';

interface dataType {
  cityInfo: string;
  status: string;
}

function useFav(key: string) {
  const [favItem, setFavItem] = useState(() => {
    const storage = window.localStorage.getItem(key);
    return storage ? (JSON.parse(storage) as dataType[]) : [];
  });

  const addToFavList = (data: dataType) => {
    setFavItem((pre: dataType[]) => {
      const result = [...pre, data];
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  const deleteEachResult = (name: dataType) => {
    const newArray = [...favItem];
    const filterArray = newArray.filter((item) => item.cityInfo != name.cityInfo);
    localStorage.setItem(key, JSON.stringify(filterArray));
    setFavItem(filterArray);
  };

  return { favItem, addToFavList, deleteEachResult };
}

export default useFav;
