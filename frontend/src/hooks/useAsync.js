import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export const useAsync = () => {
  const [loading, setLoading] = useState(false);

  const run = useCallback(async (fn, fallback = 'Something went wrong') => {
    setLoading(true);
    try {
      return await fn();
    } catch (error) {
      toast.error(error.response?.data?.message || fallback);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, run };
};

