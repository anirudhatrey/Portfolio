import { useEffect, useState } from 'react';

/**
 * Hook to check if the component has mounted on the client
 * Useful for avoiding hydration mismatches with localStorage/client-only data
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}



