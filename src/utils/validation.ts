import { z } from 'zod'

const phoneRegex = /^\+?[0-9 ()-]{7,20}$/

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(80),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number with country code'),
  email: z.string().trim().email('Enter a valid email address'),
  country: z.string().min(1, 'Select your country'),
  service: z.string().min(1, 'Choose the service you need'),
  budget: z.string().min(1, 'Select an indicative budget'),
  preferred: z.enum(['whatsapp', 'phone', 'email', 'video']),
  message: z.string().trim().min(20, 'Tell us a little more (at least 20 characters)').max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the privacy notice to continue' }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
})

export const contactStepSchemas = [
  contactSchema.pick({ fullName: true, phone: true, email: true, country: true }),
  contactSchema.pick({ service: true, budget: true, preferred: true }),
  contactSchema.pick({ message: true, consent: true, website: true }),
]

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your name'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number'),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please accept the privacy notice' }) }),
})

export const newsletterSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
})

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().regex(phoneRegex, 'Enter a valid phone number'),
  role: z.string().min(1, 'Select a role'),
  linkedin: z.string().trim().url('Enter a full URL, including https://').or(z.literal('')),
  message: z.string().trim().min(30, 'Tell us briefly why this role fits you').max(1500),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you agree to the privacy notice' }) }),
})

export type ContactFormValues = z.infer<typeof contactSchema>
export type QuoteFormValues = z.infer<typeof quoteSchema>

export const budgetRanges = [
  'Under $500',
  '$500 – $2,000',
  '$2,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
]

export const preferredMethods = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone call' },
  { value: 'email', label: 'Email' },
  { value: 'video', label: 'Video call' },
]

export const countries = [
  'United Arab Emirates',
  'Saudi Arabia',
  'Pakistan',
  'India',
  'United Kingdom',
  'Germany',
  'Estonia',
  'United States',
  'Canada',
  'Australia',
  'Other',
]
