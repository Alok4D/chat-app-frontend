import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(8, "Phone number must be at least 8 digits")
  .max(15, "Phone number is too long")
  .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format");

export const loginFormSchema = z.object({
  phone: phoneSchema,
  name: z.string().min(2, "Name must be at least 2 characters").max(40, "Name is too long"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const createGroupSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters").max(50, "Group name too long"),
  description: z.string().max(200, "Description too long").optional(),
  participantIds: z.array(z.string()).min(1, "Select at least 1 participant"),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;

export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(4000, "Message is too long"),
});
