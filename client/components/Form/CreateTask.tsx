'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../UI/Modal';
import TaskForm from './TaskForm';
import { TTaskSchema, taskSchema } from '@/lib/schemas/task';

const CreateTask = () => {
  const methods = useForm<TTaskSchema>({
    resolver: zodResolver(taskSchema),
    mode: 'onTouched',
    progressive: true,
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const queryClient = useQueryClient();
  const taskMutation = useMutation({
    mutationFn: (data: TTaskSchema) => {
      return fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const submitHandler = handleSubmit((data: TTaskSchema) =>
    taskMutation.mutateAsync(data)
  );

  const disabledSubmit = !isValid || taskMutation.isPending;
  return (
    <FormProvider {...methods}>
      <Modal
        title='Create new task'
        body={<TaskForm />}
        onSubmit={submitHandler}
        buttonOpenProps={{
          size: 'lg',
          color: 'secondary',
        }}
        actionButtonProps={{
          isDisabled: disabledSubmit,
          isLoading: taskMutation.isPending,
        }}
      />
    </FormProvider>
  );
};

export default CreateTask;
