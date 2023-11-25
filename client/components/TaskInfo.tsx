import { Spacer } from '@nextui-org/spacer';
import { TTaskSchema } from '@/lib/schemas/task';

type Props = {
  task: TTaskSchema;
};

const TaskInfo = ({ task }: Props) => {
  return (
    <>
      <p className='text-lg'>{task.title}</p>
      <Spacer x={4} />
      <p className='text-md text-default-500'>priority: {task.priority}</p>
      <Spacer x={4} />
      <p className='text-md text-default-500'>id: {task.id}</p>
    </>
  );
};

export default TaskInfo;
