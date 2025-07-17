import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star, ShoppingCart, Play } from 'lucide-react'

// Import service logos
import netflixLogo from '../assets/images/services/netflix.png'
import spotifyLogo from '../assets/images/services/spotify.png'
import disneyPlusLogo from '../assets/images/services/disney-plus.png'
import primeVideoLogo from '../assets/images/services/prime-video.png'
import shahidVipLogo from '../assets/images/services/shahid-vip.png'

const translations = {
  ar: {
    title: 'خدمات الترفيه',
    subtitle: 'حسابات مميزة لأفضل منصات الترفيه والبث',
    duration: 'المدة',
    quality: 'الجودة',
    features: 'الميزات',
    subscribe: 'اشترك الآن',
    viewPlans: 'عرض الخطط',
    popular: 'الأكثر شعبية',
    premium: 'مميز',
    family: 'عائلي',
    individual: 'فردي'
  },
  en: {
    title: 'Entertainment Services',
    subtitle: 'Premium accounts for the best entertainment and streaming platforms',
    duration: 'Duration',
    quality: 'Quality',
    features: 'Features',
    subscribe: 'Subscribe Now',
    viewPlans: 'View Plans',
    popular: 'Most Popular',
    premium: 'Premium',
    family: 'Family',
    individual: 'Individual'
  },
  fr: {
    title: 'Services de Divertissement',
    subtitle: 'Comptes premium pour les meilleures plateformes de divertissement et streaming',
    duration: 'Durée',
    quality: 'Qualité',
    features: 'Fonctionnalités',
    subscribe: 'S\'abonner Maintenant',
    viewPlans: 'Voir les Plans',
    popular: 'Le Plus Populaire',
    premium: 'Premium',
    family: 'Famille',
    individual: 'Individuel'
  },
  es: {
    title: 'Servicios de Entretenimiento',
    subtitle: 'Cuentas premium para las mejores plataformas de entretenimiento y streaming',
    duration: 'Duración',
    quality: 'Calidad',
    features: 'Características',
    subscribe: 'Suscribirse Ahora',
    viewPlans: 'Ver Planes',
    popular: 'Más Popular',
    premium: 'Premium',
    family: 'Familiar',
    individual: 'Individual'
  },
  tr: {
    title: 'Eğlence Hizmetleri',
    subtitle: 'En iyi eğlence ve yayın platformları için premium hesaplar',
    duration: 'Süre',
    quality: 'Kalite',
    features: 'Özellikler',
    subscribe: 'Şimdi Abone Ol',
    viewPlans: 'Planları Görüntüle',
    popular: 'En Popüler',
    premium: 'Premium',
    family: 'Aile',
    individual: 'Bireysel'
  }
}

const services = [
  {
    id: 1,
    name: 'Netflix',
    logo: netflixLogo,
    color: 'from-red-600 to-red-800',
    plans: [
      {
        type: 'Basic',
        price: '$8.99',
        duration: '1 Month',
        quality: 'HD',
        features: ['1 Screen', 'HD Quality', 'Mobile & Tablet']
      },
      {
        type: 'Standard',
        price: '$13.99',
        duration: '1 Month',
        quality: 'Full HD',
        features: ['2 Screens', 'Full HD', 'All Devices'],
        popular: true
      },
      {
        type: 'Premium',
        price: '$17.99',
        duration: '1 Month',
        quality: '4K Ultra HD',
        features: ['4 Screens', '4K Ultra HD', 'All Devices', 'HDR']
      }
    ]
  },
  {
    id: 2,
    name: 'Spotify',
    logo: spotifyLogo,
    color: 'from-green-500 to-green-700',
    plans: [
      {
        type: 'Individual',
        price: '$9.99',
        duration: '1 Month',
        quality: 'High Quality',
        features: ['Ad-free music', 'Offline downloads', 'Unlimited skips']
      },
      {
        type: 'Family',
        price: '$15.99',
        duration: '1 Month',
        quality: 'High Quality',
        features: ['6 accounts', 'Ad-free music', 'Offline downloads', 'Family mix'],
        popular: true
      }
    ]
  },
  {
    id: 3,
    name: 'Disney+',
    logo: disneyPlusLogo,
    color: 'from-blue-600 to-blue-800',
    plans: [
      {
        type: 'Monthly',
        price: '$7.99',
        duration: '1 Month',
        quality: '4K Ultra HD',
        features: ['4K Ultra HD', 'HDR10', 'Dolby Vision', 'Unlimited downloads']
      },
      {
        type: 'Annual',
        price: '$79.99',
        duration: '12 Months',
        quality: '4K Ultra HD',
        features: ['4K Ultra HD', 'HDR10', 'Dolby Vision', 'Unlimited downloads', 'Save 16%'],
        popular: true
      }
    ]
  },
  {
    id: 4,
    name: 'Prime Video',
    logo: primeVideoLogo,
    color: 'from-blue-500 to-cyan-600',
    plans: [
      {
        type: 'Monthly',
        price: '$8.99',
        duration: '1 Month',
        quality: '4K Ultra HD',
        features: ['4K Ultra HD', 'HDR', 'Dolby Atmos', 'X-Ray features']
      },
      {
        type: 'Annual',
        price: '$99.99',
        duration: '12 Months',
        quality: '4K Ultra HD',
        features: ['4K Ultra HD', 'HDR', 'Dolby Atmos', 'X-Ray features', 'Prime benefits'],
        popular: true
      }
    ]
  },
  {
    id: 5,
    name: 'Shahid VIP',
    logo: shahidVipLogo,
    color: 'from-purple-600 to-pink-600',
    plans: [
      {
        type: 'VIP',
        price: '$9.99',
        duration: '1 Month',
        quality: 'Full HD',
        features: ['Ad-free', 'Full HD', 'Exclusive content', 'Live TV']
      },
      {
        type: 'VIP Sports',
        price: '$19.99',
        duration: '1 Month',
        quality: 'Full HD',
        features: ['All VIP features', 'Live sports', 'Exclusive matches', 'Multi-angle view'],
        popular: true
      }
    ]
  }
]

function AnimatedBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[2, 64, 64]} position={[0, 0, -3]}>
          <MeshDistortMaterial
            color="#ec4899"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.8}
            transparent
            opacity={0.1}
          />
        </Sphere>
      </Float>
    </Canvas>
  )
}

function ServiceCard({ service, language }) {
  const t = translations[language]
  
  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
            <img 
              src={service.logo} 
              alt={service.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {service.name}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              <Play className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Streaming Service</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {service.plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${
                plan.popular 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-white/20 bg-black/20'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  {t.popular}
                </Badge>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-white">{plan.type}</h4>
                  <p className="text-gray-400 text-sm">{plan.duration}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">{plan.price}</div>
                  <div className="text-gray-400 text-sm">{t.duration}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-300 mb-2">{t.quality}: {plan.quality}</div>
                <div className="space-y-1">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className={`w-full bg-gradient-to-r ${service.color} text-white hover:opacity-90 transition-opacity`}
              >
                {t.subscribe}
                <ShoppingCart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function EntertainmentPage({ language }) {
  const t = translations[language]

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <AnimatedBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              language={language}
            />
          ))}
        </div>

        {/* Additional Services */}
        <div className="text-center">
          <Card className="bg-black/40 backdrop-blur-md border-white/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'ar' ? 'خدمات إضافية' :
               language === 'en' ? 'Additional Services' :
               language === 'fr' ? 'Services Supplémentaires' :
               language === 'es' ? 'Servicios Adicionales' :
               'Ek Hizmetler'}
            </h3>
            <p className="text-gray-400 mb-6">
              {language === 'ar' ? 'نوفر أيضاً حسابات لخدمات أخرى مثل Hulu وTOD وغيرها' :
               language === 'en' ? 'We also provide accounts for other services like Hulu, TOD, and more' :
               language === 'fr' ? 'Nous fournissons également des comptes pour d\'autres services comme Hulu, TOD, et plus' :
               language === 'es' ? 'También proporcionamos cuentas para otros servicios como Hulu, TOD, y más' :
               'Hulu, TOD ve daha fazlası gibi diğer hizmetler için de hesaplar sağlıyoruz'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="border-purple-500 text-purple-400">Hulu</Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-400">TOD</Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-400">Apple TV+</Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-400">HBO Max</Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-400">Paramount+</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

