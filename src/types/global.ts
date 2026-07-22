export interface GlobalSettings {
  siteName: string
  siteDescription: string
  contact: {
    email: string
    phone?: string
    linkedin?: string
  }
  theme: {
    primaryColor: string
    accentColor: string
  }
}

export interface SEOData {
  title?: string
  description?: string
  image?: string
}

export interface NavigationItem {
  title: string
  href: string
  children?: NavigationItem[]
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface RegistrationFormData {
  name: string
  email: string
  phone: string
  company?: string
  trainingProgram: string
  message?: string
}
