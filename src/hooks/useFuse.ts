import Fuse from 'fuse.js';
import { useMemo } from 'react';

export interface FuseOptions<T> {
  data: T[];
  options: Fuse.IFuseOptions<T>;
}

export default function useFuse<T>({ 
  data,
  options,
}: FuseOptions<T>): Fuse<T, Fuse.IFuseOptions<T>> {
  const fuse = useMemo(() => {
    const fuseOptions = {
      threshold: 0.2,
      ...options,
    };

    return new Fuse(data, fuseOptions);
  }, [data, options]);

  return fuse;
}