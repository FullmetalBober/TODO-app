'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { TTaskSchema } from '@/lib/schemas/task';

const TaskForm = () => {
  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext<TTaskSchema>();

  useEffect(() => reset(), [reset]);

  return (
    <form className='flex flex-col justify-center gap-4'>
      <Input
        {...register('title')}
        label='Title'
        variant='bordered'
        isInvalid={!!errors.title}
      />

      <Input
        {...register('priority')}
        type='number'
        label='Priority'
        variant='bordered'
        isInvalid={!!errors.priority}
      />
    </form>
  );
};

export default TaskForm;
