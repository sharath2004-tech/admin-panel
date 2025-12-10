import * as z from "zod";

export const createPropertySchema = z.object({
  name: z.string(),
  images: z.array(z.any()),
  videoTour: z.any().optional(),
  price: z.number().or(z.undefined()),
  currency: z.string(),
  description: z.string(),
  paymentDescription: z.string(),
  propertyHomeType: z.string(),
  propertyType: z.string(),
  details: z.object({
    area: z.number().or(z.undefined()),
    bedroom: z.number().or(z.undefined()),
    bathroom: z.number().or(z.undefined()),
    yearBuilt: z.number().or(z.undefined()),
    floor: z.number().or(z.undefined()).optional(),
  }),
  owner: z.string(),
  agent: z.string(),
  address: z.object({
    location: z.string(),
    city: z.string(),
    loc: z.array(z.number()).length(2),
  }),
  amenities: z.array(z.string()),
  facilities: z.array(
    z.object({
      facility: z.string(),
      distance: z.number().or(z.undefined()),
    })
  ),
  isFeatured: z.boolean(),
  isFurnished: z.boolean().or(z.undefined()),
});


