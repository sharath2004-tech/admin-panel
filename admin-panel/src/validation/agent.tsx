import * as z from "zod";

export const agentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
  whatsappNumber: z.string(),
});
