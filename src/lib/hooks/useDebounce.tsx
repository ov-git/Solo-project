import { useEffect, useState } from "react";

const useDebounce = (term: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(term);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(term);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [term, delay]);

  return debouncedValue;
};

export default useDebounce;
