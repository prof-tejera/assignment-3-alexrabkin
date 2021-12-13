import { useState, useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
  const interval = useRef();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      interval.current = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(interval.current);
    }
  }, [delay]);

  return interval.current;
};

// inspired by https://react-hooks.org/docs/usetimeoutwhen/
export const useTimeoutWhen = (callback_, delay, when) => {
  const savedRefCallback = useRef();

  useEffect(() => {
    savedRefCallback.current = callback_;
  });

  function callback() {
    savedRefCallback.current && savedRefCallback.current();
  }

  useEffect(() => {
    if (when && delay !== null) {
      const timeout = setTimeout(callback, delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [when, delay]);
};

export const usePersistedState = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Read initial value from local storage or fallback to the given initial value
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
