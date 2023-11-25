'use client';

import { Input } from '@nextui-org/input';
import useQueryParams from '@/app/hooks/useQueryParams';

const Search = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const searchParam = queryParams.get('q') || '';

  const handleSearchChange = (value: string) => setQueryParams('q', value);
  return (
    <Input
      variant='bordered'
      label='Search'
      value={searchParam}
      onValueChange={handleSearchChange}
    />
  );
};

export default Search;
