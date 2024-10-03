import { z } from 'zod';

export const TodoFormSchema = z.object({
    id: z.number ({
        required_error:"please input id of todo",
        invalid_type_error:"please input valid id of todo"
    }),
    title: z.string ({
        required_error:"please input title of todo",
    }),
});