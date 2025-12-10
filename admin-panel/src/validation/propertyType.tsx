import * as z from "zod";

export const propertyTypeSchema = z.object({
  name: z.string(),
});
