import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "Minimum 3 Characters" })
    .max(1000, { message: "Minimum 1000 Characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "Minimum 3 Characters" })
    .max(1000, { message: "Minimum 1000 Characters" }),
});

