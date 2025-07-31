import { z } from "zod";

export const entrySchema = z.object({
  title: z.string(),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string(),
  budget: z.string(),
  location: z.string(),
  duration: z.string(),
  yearTime: z.string(),
  poster: z.string().optional().nullable(),
});
