import * as z from "zod";

export const formSchema = z.object({
  postUrl: z.string().url({
    message: "Please enter a valid URL for the video.",
  }),
});
