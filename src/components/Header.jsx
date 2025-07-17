import { useState } from 'react'
import { Menu, X, Globe, User } from 'lucide-react'
import { Button } from './ui/button'

const translations = {
  ar: {
    games: 'الألعاب الإلكترونية',
    entertainment: 'خدمات الترفيه',
    services: 'خدمات أخرى',
    language: 'تغيير اللغة',
    admin: 'تسجيل دخول المسؤول',
    contact: 'تواصل معنا',
    home: 'الرئيسية'
  },
  en: {
    games: 'Electronic Games',
    entertainment: 'Entertainment Services',
    services: 'Other Services',
    language: 'Change Language',
    admin: 'Admin Login',
    contact: 'Contact Us',
    home: 'Home'
  },
  fr: {
    games: 'Jeux Électroniques',
    entertainment: 'Services de Divertissement',
    services: 'Autres Services',
    language: 'Changer la Langue',
    admin: 'Connexion Admin',
    contact: 'Nous Contacter',
    home: 'Accueil'
  },
  es: {
    games: 'Juegos Electrónicos',
    entertainment: 'Servicios de Entretenimiento',
    services: 'Otros Servicios',
    language: 'Cambiar Idioma',
    admin: 'Inicio de Sesión Admin',
    contact: 'Contáctanos',
    home: 'Inicio'
  },
  tr: {
    games: 'Elektronik Oyunlar',
    entertainment: 'Eğlence Hizmetleri',
    services: 'Diğer Hizmetler',
    language: 'Dil Değiştir',
    admin: 'Admin Girişi',
    contact: 'İletişim',
    home: 'Ana Sayfa'
  }
}

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
]

export default function Header({ language, setLanguage, currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const t = translations[language]

  const scrollToContact = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-white cursor-pointer hover:text-purple-400 transition-colors"
            onClick={() => setCurrentPage('home')}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Denima
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400 hover:bg-white/10"
              onClick={() => setCurrentPage('home')}
            >
              {t.home}
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400 hover:bg-white/10"
              onClick={() => setCurrentPage('games')}
            >
              {t.games}
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400 hover:bg-white/10"
              onClick={() => setCurrentPage('entertainment')}
            >
              {t.entertainment}
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400 hover:bg-white/10"
              onClick={() => setCurrentPage('services')}
            >
              {t.services}
            </Button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe className="w-4 h-4 mr-2" />
                {languages.find(lang => lang.code === language)?.flag}
              </Button>
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg py-2 min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/10 flex items-center space-x-2"
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsLanguageOpen(false)
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              className="text-white hover:text-purple-400 hover:bg-white/10"
              onClick={scrollToContact}
            >
              {t.contact}
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:text-purple-400 hover:bg-white/10"
              onClick={() => setCurrentPage('admin')}
            >
              <User className="w-4 h-4 mr-2" />
              {t.admin}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-white hover:text-purple-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-4">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10 justify-start"
                onClick={() => {
                  setCurrentPage('home')
                  setIsMenuOpen(false)
                }}
              >
                {t.home}
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10 justify-start"
                onClick={() => {
                  setCurrentPage('games')
                  setIsMenuOpen(false)
                }}
              >
                {t.games}
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10 justify-start"
                onClick={() => {
                  setCurrentPage('entertainment')
                  setIsMenuOpen(false)
                }}
              >
                {t.entertainment}
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10 justify-start"
                onClick={() => {
                  setCurrentPage('services')
                  setIsMenuOpen(false)
                }}
              >
                {t.services}
              </Button>
              <div className="border-t border-white/20 pt-2 mt-2">
                <div className="text-white text-sm mb-2">{t.language}:</div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="px-3 py-2 text-left text-white hover:bg-white/10 rounded flex items-center space-x-2"
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsMenuOpen(false)
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-xs">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10 justify-start"
                onClick={() => {
                  scrollToContact()
                  setIsMenuOpen(false)
                }}
              >
                {t.contact}
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-white/10 justify-start"
                onClick={() => {
                  setCurrentPage('admin')
                  setIsMenuOpen(false)
                }}
              >
                <User className="w-4 h-4 mr-2" />
                {t.admin}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

