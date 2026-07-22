
# 🚀 **Детальный технический план реализации нового сайта**

## 📋 **Обзор проекта**

**Цель:** Полная переделка сайта Andres Kase с нуля за 10 рабочих дней  
**Текущие проблемы:** 425+ багов, переусложнённая архитектура, избыточные зависимости  
**Результат:** Стабильный, быстрый, легко поддерживаемый сайт

---

## 🏗️ **Новая архитектура проекта**

### **Технический стек:**
```json
{
  "framework": "Next.js 14.2",
  "language": "TypeScript 5",
  "styling": "Tailwind CSS 4",
  "cms": "Sanity v3",
  "animations": "Framer Motion",
  "forms": "React Hook Form",
  "deployment": "Vercel"
}
```

### **Файловая структура:**
```
andres-kase-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Маркетинговые страницы
│   │   │   ├── page.tsx       # Главная
│   │   │   ├── koolitus/      # Обучение
│   │   │   └── andres-kase/   # Персональная страница
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Глобальные стили
│   │   ├── layout.tsx         # Root layout
│   │   └── providers.tsx      # React providers
│   ├── components/            # Реюзабельные компоненты
│   │   ├── ui/               # Базовые UI компоненты
│   │   ├── sections/         # Секционные компоненты
│   │   └── forms/            # Формы
│   ├── lib/                   # Утилиты и конфигурации
│   │   ├── sanity.ts         # Sanity клиент
│   │   ├── validations.ts    # Валидации
│   │   └── utils.ts          # Хелперы
│   ├── styles/               # CSS переменные и темы
│   │   ├── globals.css       # Глобальные стили
│   │   └── tokens.css        # Дизайн токены
│   └── types/                # TypeScript типы
│       ├── sanity.ts         # Sanity типы
│       └── global.ts         # Глобальные типы
├── sanity/                    # Sanity конфигурация
│   ├── schemas/              # Схемы документов
│   ├── config.ts             # Конфиг
│   └── migrations/           # Миграции
├── public/                   # Статические файлы
└── docs/                     # Документация
```

---

## 🗄️ **Новая Sanity CMS схема**

### **Упрощённая структура (4 основных типа):**

#### **1. Site Settings (Глобальные настройки)**
```typescript
interface SiteSettings {
  _type: "siteSettings"
  siteName: string
  siteDescription: string
  logo: Image
  favicon: Image
  
  // SEO
  defaultSeo: {
    title: string
    description: string
    image: Image
  }
  
  // Контакты
  contact: {
    email: string
    phone: string
    linkedin: string
  }
  
  // Тема
  theme: {
    primaryColor: string
    accentColor: string
  }
}
```

#### **2. Page (Страницы)**
```typescript
interface Page {
  _type: "page"
  slug: Slug
  title: string
  description: string
  
  // Page Builder
  content: PageBuilderBlock[]
  
  // SEO
  seo: {
    title: string
    description: string
    image: Image
  }
}

type PageBuilderBlock = 
  | HeroBlock
  | StatsBlock
  | FeaturesBlock
  | TestimonialsBlock
  | CtaBlock
  | TextBlock
```

#### **3. Training (Обучение)**
```typescript
interface Training {
  _type: "training"
  title: string
  description: string
  
  // Программа
  program: {
    duration: string
    modules: TrainingModule[]
    schedule: TrainingSchedule[]
  }
  
  // Цены
  pricing: PricingPlan[]
  
  // Преподаватели
  instructors: Instructor[]
  
  // Отзывы
  testimonials: Testimonial[]
}
```

#### **4. Testimonial (Отзывы)**
```typescript
interface Testimonial {
  _type: "testimonial"
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: Image
  featured: boolean
}
```

---

## 📊 **План миграции данных**

### **Этапы миграции:**

#### **1. Экспорт текущих данных (День 1)**
```bash
# Создание скрипта экспорта
npm run sanity:export
# Сохранение в JSON файлы
```

#### **2. Трансформация данных (День 2)**
```typescript
// Скрипт трансформации
const transformData = {
  // Hero данные → PageBuilder HeroBlock
  hero: transformHeroToHeroBlock,
  
  // Статистика → StatsBlock  
  stats: transformStatsToStatsBlock,
  
  // Отзывы → Testimonial документы
  testimonials: transformTestimonials,
  
  // Программа обучения → Training документ
  training: transformTrainingData
}
```

#### **3. Импорт в новую схему (День 3)**
```bash
# Импорт трансформированных данных
npm run sanity:import
# Валидация данных
npm run sanity:validate
```

---

## 📅 **Детальный план разработки по дням**

### **День 1: Фундамент и настройка**
**Задачи:**
- [ ] Создание нового Next.js проекта
- [ ] Настройка TypeScript и ESLint
- [ ] Установка и настройка Tailwind CSS
- [ ] Создание базовой файловой структуры
- [ ] Настройка Sanity v3 проекта

**Файлы для создания:**
```
package.json
next.config.ts
tailwind.config.ts
tsconfig.json
src/app/layout.tsx
src/app/globals.css
sanity.config.ts
```

### **День 2: Дизайн система и UI компоненты**
**Задачи:**
- [ ] Создание дизайн токенов
- [ ] Настройка цветовой схемы
- [ ] Создание базовых UI компонентов
- [ ] Настройка типографики

**Компоненты:**
```
src/components/ui/
├── Button.tsx
├── Card.tsx
├── Input.tsx
├── Badge.tsx
├── Avatar.tsx
└── index.ts
```

### **День 3: Sanity CMS и типы**
**Задачи:**
- [ ] Создание схем документов
- [ ] Настройка TypeScript типов
- [ ] Создание Sanity клиента
- [ ] Настройка GROQ запросов

**Файлы:**
```
sanity/schemas/
├── siteSettings.ts
├── page.ts
├── training.ts
└── testimonial.ts

src/types/
├── sanity.ts
└── global.ts

src/lib/
├── sanity.ts
└── queries.ts
```

### **День 4: Главная страница**
**Задачи:**
- [ ] Создание Hero секции
- [ ] Статистика блок
- [ ] Features секция
- [ ] CTA блоки
- [ ] Отзывы

**Компоненты:**
```
src/components/sections/
├── Hero.tsx
├── Stats.tsx
├── Features.tsx
├── Testimonials.tsx
└── Cta.tsx

src/app/(marketing)/page.tsx
```

### **День 5: Страница обучения**
**Задачи:**
- [ ] Программа обучения
- [ ] Расписание групп
- [ ] Цены и тарифы
- [ ] Форма регистрации

**Компоненты:**
```
src/app/(marketing)/koolitus/
├── page.tsx
├── program.tsx
├── pricing.tsx
└── register.tsx

src/components/forms/
└── RegistrationForm.tsx
```

### **День 6: Персональная страница Andres Kase**
**Задачи:**
- [ ] Hero секция с фото
- [ ] Биография и опыт
- [ ] Достижения
- [ ] Контакты

**Компоненты:**
```
src/app/(marketing)/andres-kase/
├── page.tsx
├── hero.tsx
├── bio.tsx
├── achievements.tsx
└── contact.tsx
```

### **День 7: Формы и функциональность**
**Задачи:**
- [ ] React Hook Form интеграция
- [ ] Валидация форм
- [ ] API routes для отправки
- [ ] Обработка ошибок

**Файлы:**
```
src/app/api/
├── register/route.ts
├── contact/route.ts
└── newsletter/route.ts

src/lib/
├── validations.ts
└── utils.ts
```

### **День 8: Анимации и интерактивность**
**Задачи:**
- [ ] Framer Motion настройка
- [ ] Анимации секций
- [ ] Микро-взаимодействия
- [ ] Lazy loading

**Компоненты:**
```
src/components/
├── MotionProvider.tsx
├── AnimatedSection.tsx
└── LazyImage.tsx
```

### **День 9: Оптимизация и SEO**
**Задачи:**
- [ ] Meta теги и Open Graph
- [ ] Structured data
- [ ] Оптимизация изображений
- [ ] Core Web Vitals

**Файлы:**
```
src/app/
├── metadata.ts
├── robots.ts
└── sitemap.ts

src/components/
└── OptimizedImage.tsx
```

### **День 10: Тестирование и деплой**
**Задачи:**
- [ ] Тестирование всех страниц
- [ ] Мобильная адаптация
- [ ] Деплой на Vercel
- [ ] Настройка доменов
- [ ] Финальное тестирование

---

## 🔧 **Ключевые технические решения**

### **1. Управление состоянием**
```typescript
// React Context для темы
const ThemeContext = createContext()

// React Query для кэширования Sanity данных
const { data: siteData } = useQuery({
  queryKey: ['siteSettings'],
  queryFn: getSiteSettings,
  staleTime: 60 * 60 * 1000 // 1 час
})
```

### **2. Оптимизация изображений**
```typescript
// Next.js Image компонент с Sanity
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

const OptimizedImage = ({ image, alt }) => (
  <Image
    src={urlForImage(image).url()}
    alt={alt}
    width={800}
    height={600}
    priority={false}
    placeholder="blur"
  />
)
```

### **3. Кэширование Sanity запросов**
```typescript
// Стратегия кэширования
export const getSiteSettings = cache(async () => {
  return client.fetch(SITE_SETTINGS_QUERY, {}, {
    next: { revalidate: 3600 } // 1 час
  })
})
```

### **4. Обработка ошибок**
```typescript
// Граничный компонент для ошибок
const ErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundaryComponent
      fallback={<ErrorFallback />}
      onError={logError}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
```

---

## 📦 **Package.json (упрощённый)**
```json
{
  "dependencies": {
    "next": "14.2.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "5.0.0",
    "tailwindcss": "4.0.0",
    "@sanity/client": "^6.0.0",
    "@sanity/image-url": "^1.0.0",
    "framer-motion": "^10.0.0",
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "^3.0.0",
    "zod": "^3.0.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.2.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

---

## 🚀 **Деплой стратегия**

### **Vercel конфигурация:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity_project_id",
    "NEXT_PUBLIC_SANITY_DATASET": "@sanity_dataset",
    "SANITY_API_READ_TOKEN": "@sanity_api_read_token"
  }
}
```

### **Домены и redirects:**
```typescript
// next.config.ts
const redirects = [
  {
    source: '/wp-admin/:path*',
    destination: '/',
    permanent: true
  },
  {
    source: '/old-page',
    destination: '/new-page',
    permanent: true
  }
]
```

---

## 🎯 **Резюме и следующие шаги**

### **Готовый план реализации:**
✅ **Архитектура:** Next.js 14.2 + TypeScript + Tailwind + Sanity v3  
✅ **Файловая структура:** Логичная и масштабируемая  
✅ **CMS схема:** Упрощённая (4 типа документов)  
✅ **Миграция данных:** 3-дневный план  
✅ **Разработка:** Поэтапный план на 10 дней  

### **Ключевые преимущества нового подхода:**
- **70% меньше кода** за счёт удаления дублирования
- **Стабильная архитектура** без технического долга  
- **Быстрая разработка** новых функций
- **Отличная производительность** и Core Web Vitals
- **Лёгкая поддержка** и масштабирование

### **Необходимые действия для старта:**
1. **Создать новый репозиторий** `andres-kase-v2`
2. **Настроить окружения** (development, staging, production)
3. **Резервное копирование** текущих Sanity данных
4. **Начать с Day 1** - создание фундамента проекта

### **Риски и митигация:**
- **Потеря данных:** Полный бэкап перед миграцией
- **Срыв сроков:** Поэтапная разработка с ежедневными проверками
- **Баги:** Тестирование на каждом этапе

---

## 🚀 **Готовность к реализации**

План полностью готов к исполнению. Все технические решения продуманы, файловая структура спланирована, этапы разработки детализированы.

**Рекомендую начать немедленно** - каждый день отсрочки увеличивает технический долг текущего сайта.

Хотите, чтобы я помог создать начальную структуру проекта или начать с какого-то конкретного этапа?