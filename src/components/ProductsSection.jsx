import { Canvas } from '@react-three/fiber'
import { Float, Text3D, Center } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { 
  Gamepad2, 
  Tv, 
  Settings, 
  ArrowRight,
  Monitor,
  Palette,
  Video,
  TrendingUp,
  Globe
} from 'lucide-react'

// Import game images
import helldivers2 from '../assets/images/games/helldivers2.jpg'
import monsterHunter from '../assets/images/games/monster-hunter-wilds.png'
import eldenRing from '../assets/images/games/elden-ring.jpg'
import assassinsCreed from '../assets/images/games/assassins-creed.jpg'

// Import service logos
import netflix from '../assets/images/services/netflix.png'
import spotify from '../assets/images/services/spotify.png'
import primeVideo from '../assets/images/services/prime-video.png'
import shahidVip from '../assets/images/services/shahid-vip.png'

const translations = {
  ar: {
    title: 'منتجات Denima',
    subtitle: 'اكتشف مجموعتنا المتنوعة من المنتجات والخدمات',
    games: {
      title: 'ألعاب إلكترونية',
      description: 'أحدث الألعاب الإلكترونية والأكثر شعبية',
      items: [
        { name: 'Helldivers 2', price: '40$', image: helldivers2 },
        { name: 'Monster Hunter Wilds', price: '60$', image: monsterHunter },
        { name: 'Elden Ring: Shadow of the Erdtree', price: '40$', image: eldenRing },
        { name: 'Assassin\'s Creed Shadows', price: '70$', image: assassinsCreed }
      ],
      viewAll: 'ألعاب إلكترونية'
    },
    entertainment: {
      title: 'حسابات ترفيهية',
      description: 'حسابات مميزة لأفضل منصات الترفيه',
      items: [
        { name: 'Netflix', price: '15$/شهر', image: netflix },
        { name: 'Spotify', price: '10$/شهر', image: spotify },
        { name: 'Prime Video', price: '9$/شهر', image: primeVideo },
        { name: 'Shahid VIP', price: '8$/شهر', image: shahidVip }
      ],
      viewAll: 'حسابات ترفيهية'
    },
    services: {
      title: 'خدمات رقمية أخرى',
      description: 'خدمات رقمية متنوعة لتلبية احتياجاتك',
      items: [
        { name: 'تفعيل Windows', description: 'متاح الآن', icon: Monitor },
        { name: 'حسابات Canva', description: 'متاح الآن', icon: Palette },
        { name: 'حسابات CapCut', description: 'متاح الآن', icon: Video },
        { name: 'زيادة المتابعين', description: 'متاح الآن', icon: TrendingUp }
      ],
      viewAll: 'خدمات رقمية أخرى'
    }
  },
  en: {
    title: 'Denima Products',
    subtitle: 'Discover our diverse range of products and services',
    games: {
      title: 'Electronic Games',
      description: 'Latest and most popular electronic games',
      items: [
        { name: 'Helldivers 2', price: '$40', image: helldivers2 },
        { name: 'Monster Hunter Wilds', price: '$60', image: monsterHunter },
        { name: 'Elden Ring: Shadow of the Erdtree', price: '$40', image: eldenRing },
        { name: 'Assassin\'s Creed Shadows', price: '$70', image: assassinsCreed }
      ],
      viewAll: 'Electronic Games'
    },
    entertainment: {
      title: 'Entertainment Accounts',
      description: 'Premium accounts for the best entertainment platforms',
      items: [
        { name: 'Netflix', price: '$15/month', image: netflix },
        { name: 'Spotify', price: '$10/month', image: spotify },
        { name: 'Prime Video', price: '$9/month', image: primeVideo },
        { name: 'Shahid VIP', price: '$8/month', image: shahidVip }
      ],
      viewAll: 'Entertainment Accounts'
    },
    services: {
      title: 'Other Digital Services',
      description: 'Various digital services to meet your needs',
      items: [
        { name: 'Windows Activation', description: 'Available Now', icon: Monitor },
        { name: 'Canva Accounts', description: 'Available Now', icon: Palette },
        { name: 'CapCut Accounts', description: 'Available Now', icon: Video },
        { name: 'Followers Boost', description: 'Available Now', icon: TrendingUp }
      ],
      viewAll: 'Other Digital Services'
    }
  }
}

function FloatingCube({ position, color }) {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingCube position={[-2, 0, 0]} color="#8b5cf6" />
      <FloatingCube position={[2, 0, 0]} color="#06b6d4" />
      <FloatingCube position={[0, 2, 0]} color="#f59e0b" />
    </>
  )
}

export default function ProductsSection({ language = 'ar', setCurrentPage }) {
  const t = translations[language]

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Scene />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Games Section */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gamepad2 className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {t.games.title}
              </h3>
              <p className="text-purple-200 text-center mb-6">
                {t.games.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
                {t.games.items.map((item, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-16 object-cover rounded mb-2"
                    />
                    <h4 className="text-white text-sm font-medium mb-1">{item.name}</h4>
                    <p className="text-pink-300 text-xs font-bold">{item.price}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setCurrentPage('games')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group mt-auto"
              >
                {t.games.viewAll}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Entertainment Section */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Tv className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {t.entertainment.title}
              </h3>
              <p className="text-blue-200 text-center mb-6">
                {t.entertainment.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
                {t.entertainment.items.map((item, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-16 object-contain rounded mb-2 bg-white/10"
                    />
                    <h4 className="text-white text-sm font-medium mb-1">{item.name}</h4>
                    <p className="text-cyan-300 text-xs font-bold">{item.price}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setCurrentPage('entertainment')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group mt-auto"
              >
                {t.entertainment.viewAll}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Digital Services Section */}
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {t.services.title}
              </h3>
              <p className="text-green-200 text-center mb-6">
                {t.services.description}
              </p>

              <div className="space-y-3 mb-6 flex-grow">
                {t.services.items.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="bg-black/30 rounded-lg p-4 backdrop-blur-sm flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{item.name}</h4>
                        <p className="text-green-300 text-xs">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button 
                onClick={() => setCurrentPage('other-services')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group mt-auto"
              >
                {t.services.viewAll}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

