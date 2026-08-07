import { z } from 'zod';

// Auth
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Lead submission (covers B2B, 3rd party manufacturing, product inquiry)
export const createLeadSchema = z.object({
  category: z.enum(['B2B_LEAD', 'THIRD_PARTY_MANUFACTURING', 'PRODUCT_ENQUIRY']),
  name: z.string().min(2, 'Name is required').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  interestArea: z.string().min(1, 'Interest area is required').max(200),
  consentGiven: z.boolean().default(true),
  notes: z.string().max(1000).optional(),
});

export const updateLeadStatusSchema = z.object({
  outreachStatus: z.enum(['NEW_UNCONTACTED', 'COLD_EMAILED', 'IN_TALKS', 'CONVERTED', 'ARCHIVED']),
});

// Job Application
export const createJobApplicationSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  candidate: z.string().min(2, 'Candidate name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required').max(20),
});
// Note: resumeUrl will be added after file upload, not from body validation

// Job Management (Admin)
export const createJobSchema = z.object({
  title: z.string().min(2, 'Job title is required').max(200),
  department: z.string().min(1, 'Department is required').max(100),
  location: z.string().min(1, 'Location is required').max(100),
  type: z.string().default('Full-time'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  active: z.boolean().default(true),
});

export const updateJobSchema = createJobSchema.partial();

// News Article (Admin)
export const createNewsSchema = z.object({
  title: z.string().min(2, 'Title is required').max(300),
  category: z.string().min(1, 'Category is required').max(50),
  date: z.string().min(1, 'Date is required'),
  excerpt: z.string().min(10, 'Excerpt is required').max(500),
  content: z.string().max(10000).optional(),
  image: z.string().max(500).optional(),
  published: z.boolean().default(true),
});

export const updateNewsSchema = createNewsSchema.partial();

// Manufacturing Capability (Admin)
export const createManufacturingSchema = z.object({
  formatName: z.string().min(2, 'Format name is required').max(200),
  capacity: z.string().min(1, 'Capacity is required').max(200),
  description: z.string().min(5, 'Description is required').max(1000),
  sortOrder: z.number().int().default(0),
});

export const updateManufacturingSchema = createManufacturingSchema.partial();

// Partner Logo (Admin)
export const createPartnerLogoSchema = z.object({
  name: z.string().min(1, 'Partner name is required').max(100),
  sortOrder: z.number().int().default(0),
});
// Note: imageUrl added after file upload

// Helper: validate request body against schema
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
