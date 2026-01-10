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
  avatarUrl: z.string().url().optional().or(z.literal("")).optional(),
  title: z.string(),
  since: z.string().optional(),
  project: MemberProjectSchema,
  document: MemberDocumentSchema.optional(),
  status: MemberStatusSchema,
});

export const MemberDetailsSchema = MemberSchema.extend({
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
});

export const EditMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required"),
  avatarUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  status: z.enum(["active", "absent"]),
  project: z.object({
    name: z.string().min(1, "Project name is required"),
    subtitle: z.string().optional(),
    iconKey: z.string().optional(),
  }),
});
