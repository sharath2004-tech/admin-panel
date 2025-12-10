import * as z from "zod";

export const sendNotificationSchema = z.object({
  title: z.string(),
  desciption: z.string(),
  image: z.any(),
});
