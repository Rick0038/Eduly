import {
  Group,
  MultiSelect,
  Select,
  Slider,
  Text,
  TextInput,
} from '@mantine/core';
import {
  languages,
  priceMarks,
  ratingMarks,
  useFilters,
  weekDays,
} from '../hooks';

export function Filters() {
  const { filters, handleChange } = useFilters();

  return (
    <Group>
      <h2 className='text-xl font-semibold'>Filters</h2>

      <Group>
        <TextInput
          label='Location'
          name='location'
          placeholder='Enter location'
          className='w-full'
          value={filters.location}
          onChange={(event) =>
            handleChange('location')(event.currentTarget.value)
          }
        />
      </Group>

      <Group className='w-full mb-4 mr-1'>
        <Text className='text-sm'>Min Ratings</Text>
        <Slider
          name='minRatings'
          min={1}
          max={5}
          step={1}
          className='w-full'
          marks={ratingMarks}
          value={filters.minRatings}
          onChange={handleChange('minRatings')}
        />
      </Group>

      <Group className='w-full mb-4 mr-1'>
        <Text className='text-sm'>Max Price</Text>
        <Slider
          name='maxPrice'
          marks={priceMarks}
          min={12}
          max={100}
          className='w-full'
          value={filters.maxPrice}
          onChange={handleChange('maxPrice')}
        />
      </Group>

      <Group className='mb-1'>
        <MultiSelect
          name='availabilityDays'
          label='Availability Days'
          placeholder='Select days'
          className='w-full'
          data={weekDays}
          value={filters.availabilityDays}
          onChange={handleChange('availabilityDays')}
        />
      </Group>

      <Group className='mb-1'>
        <Select
          name='language'
          label='Language'
          placeholder='Select language'
          className='w-full'
          data={languages}
          value={filters.language}
          onChange={handleChange('language')}
        />
      </Group>
    </Group>
  );
}
