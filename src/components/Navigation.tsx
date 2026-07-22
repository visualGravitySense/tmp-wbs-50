import Link from 'next/link'
import { Button, Container } from '@/components/ui'

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <Container size="7xl" padding="default">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Andres Kase
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/koolitus" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Training
            </Link>
            <Link 
              href="/andres-kase" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/opstar-profit" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Opstar Profit
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  )
}
