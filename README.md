# Andres Kase Website v2 

Professional training and consulting website built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript 5, Tailwind CSS 4
- **Headless CMS**: Sanity v3 for content management
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **SEO Optimized**: Built-in SEO optimization and meta tags
- **Type Safety**: Full TypeScript support throughout the application
- **Performance**: Optimized images, lazy loading, and Core Web Vitals
 
## 📁 Project Structure

```
andres-kase-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Marketing pages
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── koolitus/      # Training page
│   │   │   └── andres-kase/   # About page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── sections/         # Page sections
│   │   ├── Navigation.tsx    # Navigation component
│   │   └── Footer.tsx        # Footer component
│   ├── lib/                   # Utilities and configurations
│   │   ├── sanity.ts         # Sanity client
│   │   ├── validations.ts    # Form validations
│   │   └── utils.ts          # Helper functions
│   ├── styles/               # Design tokens and themes
│   │   └── tokens.css        # CSS variables
│   └── types/                # TypeScript types
│       ├── sanity.ts         # Sanity types
│       └── global.ts         # Global types
├── sanity/                    # Sanity CMS configuration
│   ├── schemas/              # Document schemas
│   └── config.ts             # Sanity config
└── public/                   # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity v3
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Sanity account (for CMS)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd andres-kase-v2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
SANITY_API_READ_TOKEN=your_read_token
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity CMS

Access the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sanity:export` - Export Sanity data
- `npm run sanity:import` - Import Sanity data
- `npm run sanity:validate` - Validate Sanity data

## 🎨 Design System

The project uses a comprehensive design system with:

- **Color Palette**: Primary blue, accent green, semantic colors
- **Typography**: System fonts with optimized loading
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components with variants
- **Tokens**: CSS custom properties for theming

## 📱 Pages

- **Homepage** (`/`) - Hero section with call-to-action
- **Training** (`/koolitus`) - Training programs and courses
- **About** (`/andres-kase`) - Personal page with bio and achievements

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Sanity CMS Setup

1. Create a new Sanity project
2. Configure schemas in `sanity/schemas/`
3. Set up environment variables
4. Deploy studio

### Environment Variables

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Optional
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please contact:
- Email: andres@andreskase.com
- Phone: +372 512 3456
