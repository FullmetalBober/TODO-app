import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(1).max(100),
  priority: z
    .union([z.string(), z.number()])
    .transform(x => Number(x))
    .pipe(z.number().int().min(1).max(10)),
});

type additionalProps = {
  id: string;
  complete: boolean;
  created_at: string;
  updated_at: string;
};

export type TTaskSchema = z.infer<typeof taskSchema> & additionalProps;
