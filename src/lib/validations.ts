import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export const registrationFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  company: z.string().optional(),
  trainingProgram: z.string().min(1, 'Please select a training program'),
  message: z.string().optional()
})

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address')
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type RegistrationFormData = z.infer<typeof registrationFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
