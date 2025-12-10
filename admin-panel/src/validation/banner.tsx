import * as z from "zod";

export const adsValidationSchema = z.object({
  title: z.string().optional(),
  startDate: z.date().or(z.undefined()),
  endDate: z.date().or(z.undefined()),
  image: z.any(),
});
