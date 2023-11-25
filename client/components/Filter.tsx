'use client';

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import RadioGrp from './RadioGrp';
import useQueryParams from '@/app/hooks/useQueryParams';

const dataFilter = [
  { value: '', label: 'All' },
  { value: 'true', label: 'Completed' },
  { value: 'false', label: 'Uncompleted' },
];

const dataSort = [
  { value: '', label: 'Created At' },
  { value: '1', label: 'Ascending' },
  { value: '-1', label: 'Descending' },
];

const Filter = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const completedParam = queryParams.get('complete') || '';
  const sortDirectionParam = queryParams.get('sortDirection') || '';

  const handleFilterChange = (value: string) =>
    setQueryParams('complete', value);
  const handleSortChange = (value: string) =>
    setQueryParams('sortDirection', value);
  return (
    <Accordion variant='bordered' defaultExpandedKeys='1'>
      <AccordionItem key='1' aria-label='Filter & Sort' title='Filter & Sort'>
        <div className='flex flex-wrap justify-around'>
          <RadioGrp
            data={dataFilter}
            radioGroupProps={{
              label: 'Select filter',
              defaultValue: completedParam,
              onValueChange: handleFilterChange,
            }}
          />
          <RadioGrp
            data={dataSort}
            radioGroupProps={{
              label: 'Select sort priority',
              defaultValue: sortDirectionParam,
              onValueChange: handleSortChange,
            }}
          />
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Filter;
