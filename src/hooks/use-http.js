import { useState, useCallback } from 'react';
const UseHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHandler = useCallback(async (request, setData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : 'GET',
        body: request.body ? JSON.stringify(request.body) : null,
        headers: request.headers ? request.headers : {},
      });
      if (response.status !== 200) {
        throw new Error('Something went wrong...!');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    fetchHandler,
    isLoading,
  };
};

export default UseHttp;
