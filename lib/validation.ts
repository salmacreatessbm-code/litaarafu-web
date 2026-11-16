import { z } from "zod";
import { learnerGoals, services } from "@/data/siteContent";

const goalValues = learnerGoals.map((goal) => goal.value) as [string, ...string[]];
const serviceSlugs = services.map((service) => service.slug) as [
  string,
  ...string[],
];

const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254)
  .pipe(z.email("Please enter a valid email address."));

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((value) => (value ? value : null));

export const subscribeSchema = z.object({
  email,
  goal: z.enum(goalValues, "Please choose what brings you to Arabic."),
});

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Please keep your name under 120 characters."),
  email,
  serviceSlug: z.enum(serviceSlugs, "Please choose a class."),
  preferredSchedule: z
    .string()
    .trim()
    .min(3, "Tell us roughly when you're free.")
    .max(500, "Please keep this under 500 characters."),
  timezone: optionalText(80),
  notes: optionalText(2000),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;

/** First human-readable message from a failed zod parse. */
export function firstIssue(error: z.ZodError) {
  return error.issues[0]?.message ?? "Please check the form and try again.";
}
