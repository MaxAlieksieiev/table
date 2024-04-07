import { useEffect, useState } from 'react';

export function useDebounce(searchParam: string, debounce: number) {
  const [debounceSearch, setDebounceSearch] = useState(searchParam);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(searchParam);
    }, debounce);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchParam]);

  return debounceSearch;
}
