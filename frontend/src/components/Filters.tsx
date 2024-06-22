import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Flex,
  Group,
  MultiSelect,
  RangeSlider,
  Select,
  Slider,
  Text,
} from '@mantine/core';
import {
  languages,
  priceMarks,
  ratingMarks,
  useFilters,
  weekDays,
} from '../hooks';
import {
  IconAdjustments,
  IconBook2,
  IconCalendar,
  IconCurrencyEuro,
  IconLanguage,
  // IconLocation,
  IconStar,
} from '@tabler/icons-react';
import { tutorService } from '../service';

interface FiltersProps {
  onSubmit?: () => void;
}

export function Filters(props: FiltersProps) {
  const { onSubmit } = props;
  const { data: { topics } = {} } = useQuery({
    queryKey: ['getTopics'],
    queryFn: tutorService.getTopics,
  });
  const { filters, handleChange } = useFilters();

  return (
    <Group>
      <Flex justify='center' align='center' gap={1}>
        <Text size='lg' fw={500} visibleFrom='sm'>
          Filters
        </Text>
        <Group visibleFrom='sm'>
          <IconAdjustments size={20} stroke={1} />
        </Group>
      </Flex>

      <Group className='mb-1'>
        <Select
          name='topic'
          label={
            <Flex justify='center' align='center'>
              <Text className='text-sm'>Topic</Text>
              <IconBook2 size={14} />
            </Flex>
          }
          placeholder='Select topic'
          className='w-full'
          data={topics}
          value={filters.topic}
          onChange={handleChange('topic')}
          searchable
        />
      </Group>

      {/* <Group>
        <TextInput
          label={
            <Flex justify='center' align='center'>
              <Text className='text-sm'>Location</Text>
              <IconLocation size={14} />
            </Flex>
          }
          name='location'
          placeholder='Enter location'
          className='w-full'
          value={filters.location}
          onChange={(event) =>
            handleChange('location')(event.currentTarget.value)
          }
        />
      </Group> */}

      <Group className='w-full mb-4 mr-1'>
        <Flex justify='center' align='center'>
          <Text className='text-sm'>Min Ratings</Text>
          <IconStar size={14} />
        </Flex>
        <Slider
          name='ratingsMin'
          min={1}
          max={5}
          step={1}
          className='w-full'
          marks={ratingMarks}
          value={filters.ratingsMin}
          onChange={handleChange('ratingsMin')}
        />
      </Group>

      <Group className='w-full mb-4 mr-1'>
        <Flex justify='center' align='center'>
          <Text className='text-sm'>Price range</Text>
          <IconCurrencyEuro size={14} />
        </Flex>
        <RangeSlider
          name='pricing'
          minRange={10}
          min={12}
          max={100}
          className='w-full'
          value={[filters.pricingMin, filters.pricingMax]}
          marks={priceMarks}
          onChange={(value) => {
            handleChange('pricingMin')(value[0]);
            handleChange('pricingMax')(value[1]);
          }}
        />
      </Group>

      <Group className='mb-1 w-full'>
        <MultiSelect
          name='availabilityDays'
          label={
            <Flex justify='center' align='center'>
              <Text className='text-sm'>Availibity Days</Text>
              <IconCalendar size={14} />
            </Flex>
          }
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
          label={
            <Flex justify='center' align='center'>
              <Text className='text-sm'>Langauge</Text>
              <IconLanguage size={14} />
            </Flex>
          }
          placeholder='Select language'
          className='w-full'
          data={languages}
          value={filters.language}
          onChange={handleChange('language')}
        />
      </Group>

      <Group className='w-full mb-4 mr-1' hiddenFrom='sm'>
        <Button onClick={onSubmit}>Apply Filters</Button>
      </Group>
    </Group>
  );
}
