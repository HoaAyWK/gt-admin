import { useState, useEffect } from 'react';

const getSavedValue = (key, initialValue) => {
  let savedValue = null;
  if (localStorage.getItem(key))
  {
    savedValue = JSON.parse(localStorage.getItem(key));
  }

  if (savedValue !== null) return savedValue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value]);

    return [value, setValue];
};
