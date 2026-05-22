
import { useState, useEffect, useCallback } from 'react';
import { languageCentersData } from '@/data/languageCentersData.js';

export function useLanguageCenters() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API fetch on mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
        if (isMounted) {
          setData(languageCentersData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch language centers.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getAll = useCallback(() => data, [data]);

  const getById = useCallback((id) => {
    return data.find(center => center.id === id);
  }, [data]);

  const filter = useCallback((filters) => {
    return data.filter(center => {
      let matches = true;

      if (filters.search) {
        const query = filters.search.toLowerCase();
        const nameMatch = center.name.en.toLowerCase().includes(query) || center.name.ar.includes(query);
        const cityMatch = center.city.toLowerCase().includes(query);
        matches = matches && (nameMatch || cityMatch);
      }

      if (filters.languages && filters.languages !== "All") {
        matches = matches && center.languages_offered.some(lang => lang.name === filters.languages);
      }

      if (filters.location && filters.location !== "All") {
        matches = matches && center.city === filters.location;
      }

      if (filters.type && filters.type !== "All") {
        matches = matches && center.type === filters.type;
      }

      if (filters.price_range && filters.price_range !== "All") {
        matches = matches && center.pricing.price_range === filters.price_range;
      }

      if (filters.certification && filters.certification !== "All") {
        matches = matches && center.courses.some(course => course.certification.includes(filters.certification));
      }

      return matches;
    });
  }, [data]);

  const getRelatedCenters = useCallback((id, limit = 3) => {
    const currentCenter = getById(id);
    if (!currentCenter) return [];
    
    return data
      .filter(c => c.id !== id && (c.city === currentCenter.city || c.type === currentCenter.type))
      .slice(0, limit);
  }, [data, getById]);

  return {
    centers: data,
    loading,
    error,
    getAll,
    getById,
    filter,
    getRelatedCenters
  };
}
