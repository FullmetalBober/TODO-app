'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  function setQueryParams(key: string, value?: string) {
    if (value) urlSearchParams.set(key, String(value));
    else urlSearchParams.delete(key);

    const search = urlSearchParams.toString();
    const query = `?${search}`;
    router.replace(`${pathname}${query}`);
  }

  return { queryParams: searchParams, setQueryParams };
}
