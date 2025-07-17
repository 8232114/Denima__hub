import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProductsSection from './components/ProductsSection'
import WhyChooseUs from './components/WhyChooseUs'
import ContactSection from './components/ContactSection'
import GamesPage from './components/GamesPage'
import EntertainmentPage from './components/EntertainmentPage'
import OtherServicesPage from './components/OtherServicesPage'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [language, setLanguage] = useState('ar')

  const renderPage = () => {
    switch (currentPage) {
      case 'games':
        return <GamesPage language={language} />
      case 'entertainment':
        return <EntertainmentPage language={language} />
      case 'services':
        return <OtherServicesPage language={language} />
      case 'admin':
        return <AdminLogin language={language} setCurrentPage={setCurrentPage} />
      case 'admin-dashboard':
        return <AdminDashboard language={language} />
      default:
        return (
          <>
            <HeroSection language={language} />
            <ProductsSection language={language} setCurrentPage={setCurrentPage} />
            <WhyChooseUs language={language} />
            <ContactSection language={language} />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
    </div>
  )
}

export default App

