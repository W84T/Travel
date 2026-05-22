
import { useState, useEffect, useMemo } from 'react';
import { universitiesData } from '@/data/universitiesData.js';

export function useUniversities(filters = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        setData(universitiesData);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(uni => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchEn = uni.name.en.toLowerCase().includes(searchLower);
        const matchAr = uni.name.ar.includes(filters.search);
        if (!matchEn && !matchAr) return false;
      }
      if (filters.type && filters.type !== 'All') {
        if (uni.type !== filters.type) return false;
      }
      if (filters.location && filters.location !== 'All') {
        if (uni.city !== filters.location) return false;
      }
      if (filters.ranking && filters.ranking !== 'All') {
        if (filters.ranking === 'Top 100' && uni.world_ranking > 100) return false;
        if (filters.ranking === 'Top 200' && uni.world_ranking > 200) return false;
        if (filters.ranking === 'Top 500' && uni.world_ranking > 500) return false;
      }
      return true;
    });
  }, [data, filters]);

  const getUniversityById = (id) => {
    return data.find(uni => uni.id === id);
  };

  return {
    universities: filteredData,
    loading,
    error,
    getUniversityById
  };
}
