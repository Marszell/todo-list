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

export const SignUpSchema = z.object({
    name: z
        .string ()
        .min(2,{message: 'Name must be at least 2 characters long.'})
        .trim(),
    email: z
        .string()
        .email({message: 'Please enter valid email address.'})
        .trim(),
    password: z
        .string()
        .trim(),
});

export type FormState =
    | {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined