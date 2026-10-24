import { z } from "zod";

const shortText = z.string().max(2_000);
const listOfText = z.array(z.string().max(2_000)).max(100);

export const portfolioContentSchema = z.object({
  profile: z.object({
    name: shortText, role: shortText, photoUrl: z.string().max(850_000).default(""), bannerUrl: z.string().max(850_000).default(""), location: shortText.default(""), openToWork: z.boolean().default(false), phone: z.string().max(80).default(""), headline: shortText, summary: shortText,
    email: z.string().email().max(320), linkedin: z.string().max(500), whatsapp: z.string().max(1000).default(""), github: z.string().max(500), cvUrl: z.string().max(1_500_000).default(""),
    seoTitle: shortText.default("Andre Nathanael — Software Quality Assurance Engineer Specialist"), seoDescription: shortText.default("Quality assurance engineer focused on software testing, automation, and product quality."),
    experienceYears: z.number().int().min(0).max(80), projectsSupported: z.number().int().min(0).max(100_000), testCasesCreated: z.number().int().min(0).max(1_000_000),
  }),
  about: z.object({
    title: shortText, paragraphs: listOfText,
    principles: z.array(z.object({ title: shortText, description: shortText })).max(30),
    experience: z.array(z.object({ period: shortText, role: shortText, company: shortText, description: shortText })).max(50),
  }),
  education: z.array(z.object({ institution: shortText, degree: shortText, period: shortText, description: shortText, logo: z.string().max(850_000).default("") })).max(50).default([]),
  skills: z.array(z.object({ title: shortText, category: shortText, description: shortText, items: listOfText })).max(50),
  projects: z.array(z.object({ title: shortText, category: shortText, isPublished: z.boolean().default(true), tools: listOfText, description: shortText, context: shortText, strategy: shortText, result: shortText })).max(100),
  labs: z.array(z.object({ title: shortText, description: shortText, tool: shortText, example: shortText, url: z.string().max(500) })).max(50),
  certifications: z.array(z.object({ title: shortText, issuer: shortText, year: shortText, url: z.string().max(500) })).max(100),
  posts: z.array(z.object({ title: shortText, category: shortText, readTime: shortText, description: shortText, isPublished: z.boolean().default(true) })).max(100),
  navigation: z.array(z.object({ key: z.string().max(40), target: z.string().regex(/^[a-z][a-z0-9-]{0,39}$/), visible: z.boolean() })).max(30).default([
    { key: "home", target: "home", visible: true }, { key: "about", target: "about", visible: true },
    { key: "skillsNav", target: "skills", visible: true }, { key: "casesNav", target: "work", visible: true },
    { key: "labNav", target: "lab", visible: true }, { key: "credentialsNav", target: "credentials", visible: true },
    { key: "blogNav", target: "notes", visible: true }, { key: "contactNav", target: "contact", visible: true },
  ]),
  contact: z.object({ heading: shortText, message: shortText, email: z.string().email().max(320).default("bagusandrenathanael.office@gmail.com"), phone: z.string().max(80).default(""), socialLinks: z.array(z.object({ platform: shortText, url: z.string().max(1000), icon: shortText, visible: z.boolean().default(true), sortOrder: z.number().int().default(0) })).max(50).default([]) }),
  siteSettings: z.object({ siteTitle: shortText.default(""), logo: z.string().max(850_000).default(""), favicon: z.string().max(1000).default(""), seoTitle: shortText.default(""), seoDescription: shortText.default(""), themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#294c8a") }).default({}),
});
