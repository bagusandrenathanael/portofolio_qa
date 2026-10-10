import { z } from "zod";

const shortText = z.string().max(2_000);
const listOfText = z.array(z.string().max(2_000)).max(100);

export const portfolioContentSchema = z.object({
  profile: z.object({
    name: shortText, role: shortText, headline: shortText, summary: shortText,
    email: z.string().email().max(320), linkedin: z.string().max(500), github: z.string().max(500),
    experienceYears: z.number().int().min(0).max(80), projectsSupported: z.number().int().min(0).max(100_000), testCasesCreated: z.number().int().min(0).max(1_000_000),
  }),
  about: z.object({
    title: shortText, paragraphs: listOfText,
    principles: z.array(z.object({ title: shortText, description: shortText })).max(30),
    experience: z.array(z.object({ period: shortText, role: shortText, company: shortText, description: shortText })).max(50),
  }),
  skills: z.array(z.object({ title: shortText, category: shortText, description: shortText, items: listOfText })).max(50),
  projects: z.array(z.object({ title: shortText, category: shortText, tools: listOfText, description: shortText, context: shortText, strategy: shortText, result: shortText })).max(100),
  labs: z.array(z.object({ title: shortText, description: shortText, tool: shortText, example: shortText, url: z.string().max(500) })).max(50),
  certifications: z.array(z.object({ title: shortText, issuer: shortText, year: shortText, url: z.string().max(500) })).max(100),
  posts: z.array(z.object({ title: shortText, category: shortText, readTime: shortText, description: shortText })).max(100),
  contact: z.object({ heading: shortText, message: shortText }),
});
