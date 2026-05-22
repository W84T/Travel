
import { useState, useEffect } from 'react';
import { travelService } from '@/services/travelService';

export const useTravelPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await travelService.getTravelPlans();
        setPlans(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch travel plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
};
