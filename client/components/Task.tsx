import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';
import Modal from './Modal';
import TaskInfo from './TaskInfo';
import { TTaskSchema } from '@/lib/schemas/task';

type Props = {
  task: TTaskSchema;
};

const Task = ({ task }: Props) => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };
  const updateMutation = useMutation({
    mutationFn: (data: Partial<TTaskSchema>) => {
      return fetch(`/api/todos/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
    },
    onSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return fetch(`/api/todos/${task.id}`, {
        method: 'DELETE',
      });
    },
    onSuccess,
  });

  const updateCompleteHandler = () =>
    updateMutation.mutate({ complete: !task.complete });

  const deleteHandler = () => deleteMutation.mutateAsync();

  return (
    <Card className='flex flex-row place-items-center'>
      <CardBody>
        <Checkbox
          defaultSelected={task.complete}
          lineThrough
          onValueChange={updateCompleteHandler}
          size='lg'
        >
          <TaskInfo task={task} />
        </Checkbox>
      </CardBody>
      <CardFooter className='w-auto'>
        <Modal
          title={`Delete task №${task.id}`}
          body={
            <p className='text-md text-default-500'>
              Are you sure you want to delete this task?
            </p>
          }
          buttonOpenProps={{
            color: 'danger',
            variant: 'flat',
            children: 'Delete',
          }}
          actionButtonProps={{
            isLoading: deleteMutation.isPending,
          }}
          onSubmit={deleteHandler}
        />
      </CardFooter>
    </Card>
  );
};

export default Task;
