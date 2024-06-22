import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from '../util/debounce';

interface FiltersState {
  topic: string;
  location: string;
  ratingsMin: number;
  pricingMax: number;
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

const getInitialFilters = (locationSearch: string): FiltersState => {
  const params = new URLSearchParams(locationSearch);
  return {
    topic: params.get('topic') || '',
    location: params.get('location') || '',
    ratingsMin: parseInt(params.get('ratingsMin') || '0', 10),
    pricingMax: parseInt(params.get('pricingMax') || '0', 10),
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

  const updateQueryParams = useCallback(
    (filters: FiltersState) => {
      const params = new URLSearchParams();
      if (filters.topic) params.set('topic', filters.topic);
      if (filters.location) params.set('location', filters.location);
      if (filters.ratingsMin)
        params.set('ratingsMin', filters.ratingsMin.toString());
      if (filters.pricingMax)
        params.set('pricingMax', filters.pricingMax.toString());
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

  return {
    filters,
    handleChange,
  };
};
