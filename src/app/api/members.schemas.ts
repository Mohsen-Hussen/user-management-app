import { z } from "zod";

export const MemberStatusSchema = z.enum(["active", "absent"]);

export const MemberDocumentSchema = z.object({
  filename: z.string().min(1),
  sizeMb: z.number().nonnegative(),
});

export const MemberProjectSchema = z.object({
  name: z.string().min(1),
  subtitle: z.string().optional(),
  iconKey: z.string().optional(),
});

export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  title: z.string(),
  since: z.string(), // ISO date
  project: MemberProjectSchema,
  document: MemberDocumentSchema.optional(),
  status: MemberStatusSchema,
});

export const MemberDetailsSchema = MemberSchema.extend({
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
});

export type Member = z.infer<typeof MemberSchema>;
export type MemberDetails = z.infer<typeof MemberDetailsSchema>;
export type MemberStatus = z.infer<typeof MemberStatusSchema>;
