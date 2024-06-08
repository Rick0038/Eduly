import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from '../util/debounce';

interface FiltersState {
  location: string;
  minRatings: number;
  maxPrice: number;
  availabilityDays: string[];
  language: string;
}

export const ratingMarks = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

export const priceMarks = [
  { value: 12, label: '€12' },
  { value: 100, label: '€100' },
];

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

const getInitialFilters = (locationSearch: string): FiltersState => {
  const params = new URLSearchParams(locationSearch);
  return {
    location: params.get('location') || '',
    minRatings: parseInt(params.get('minRatings') || '3', 10),
    maxPrice: parseInt(params.get('maxPrice') || '12', 10),
    availabilityDays: params.get('availabilityDays')
      ? params.get('availabilityDays')!.split(',')
      : [],
    language: params.get('language') || '',
  };
};

const DEBOUNCE_TIME = 500; // 0.5 second

export const useFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState<FiltersState>(
    getInitialFilters(location.search)
  );

  const handleChange = useCallback(
    (field: keyof FiltersState) =>
      (value: FiltersState[keyof FiltersState] | null) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [field]: value,
        }));
      },
    []
  );

  const updateQueryParams = useCallback(
    (filters: FiltersState) => {
      const params = new URLSearchParams();
      if (filters.location) params.set('location', filters.location);
      if (filters.minRatings)
        params.set('minRatings', filters.minRatings.toString());
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
      if (filters.availabilityDays.length > 0)
        params.set('availabilityDays', filters.availabilityDays.join(','));
      if (filters.language) params.set('language', filters.language);

      navigate({ search: params.toString() }, { replace: true });
    },
    [navigate]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateQueryParams = useCallback(
    debounce(updateQueryParams, DEBOUNCE_TIME),
    [updateQueryParams]
  );

  useEffect(() => {
    debouncedUpdateQueryParams(filters);
  }, [filters, debouncedUpdateQueryParams]);

  return {
    filters,
    handleChange,
  };
};
