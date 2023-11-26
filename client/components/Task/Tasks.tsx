'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TTaskSchema } from '@/lib/schemas/task';
import { Spinner } from '@nextui-org/spinner';
import Task from './Task';

const Tasks = () => {
  const searchParams = useSearchParams().toString();

  const taskQuery = useQuery<TTaskSchema[]>({
    queryKey: ['tasks', searchParams],
    queryFn: ({ signal }) => {
      return (
        fetch(`/api/todos?${searchParams}`, {
          signal,
        }).then(res => res.json()) || []
      );
    },
  });

  return (
    <section className='w-full'>
      {taskQuery.isLoading && <Spinner />}
      <div className='gap-2 flex flex-col'>
        {taskQuery.isSuccess &&
          taskQuery.data.map(task => <Task key={task.id} task={task} />)}
      </div>
    </section>
  );
};

export default Tasks;
