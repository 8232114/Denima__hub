import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Filter, Star, ShoppingCart } from 'lucide-react'

// Import game images
import helldivers2 from '../assets/images/games/helldivers2.jpg'
import monsterHunterWilds from '../assets/images/games/monster-hunter-wilds.png'
import eldenRing from '../assets/images/games/elden-ring.jpg'
import assassinsCreed from '../assets/images/games/assassins-creed.jpg'
import doomDarkAges from '../assets/images/games/doom-dark-ages.jpeg'
import indianaJones from '../assets/images/games/indiana-jones.jpg'
import ff7Rebirth from '../assets/images/games/ff7-rebirth.png'
import dragonsDogma from '../assets/images/games/dragons-dogma.jpg'
import stellarBlade from '../assets/images/games/stellar-blade.png'
import marioKart from '../assets/images/games/mario-kart.jpg'

const translations = {
  ar: {
    title: 'الألعاب الإلكترونية',
    subtitle: 'اكتشف مجموعتنا الواسعة من أحدث الألعاب الإلكترونية',
    filterBy: 'تصفية حسب المنصة',
    all: 'الكل',
    pc: 'PC',
    ps: 'PlayStation',
    xbox: 'Xbox',
    nintendo: 'Nintendo',
    price: 'السعر',
    rating: 'التقييم',
    addToCart: 'أضف للسلة',
    viewDetails: 'عرض التفاصيل',
    backToHome: 'العودة للرئيسية'
  },
  en: {
    title: 'Electronic Games',
    subtitle: 'Discover our wide collection of the latest electronic games',
    filterBy: 'Filter by Platform',
    all: 'All',
    pc: 'PC',
    ps: 'PlayStation',
    xbox: 'Xbox',
    nintendo: 'Nintendo',
    price: 'Price',
    rating: 'Rating',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    backToHome: 'Back to Home'
  },
  fr: {
    title: 'Jeux Électroniques',
    subtitle: 'Découvrez notre large collection des derniers jeux électroniques',
    filterBy: 'Filtrer par Plateforme',
    all: 'Tous',
    pc: 'PC',
    ps: 'PlayStation',
    xbox: 'Xbox',
    nintendo: 'Nintendo',
    price: 'Prix',
    rating: 'Note',
    addToCart: 'Ajouter au Panier',
    viewDetails: 'Voir Détails',
    backToHome: 'Retour à l\'Accueil'
  },
  es: {
    title: 'Juegos Electrónicos',
    subtitle: 'Descubre nuestra amplia colección de los últimos juegos electrónicos',
    filterBy: 'Filtrar por Plataforma',
    all: 'Todos',
    pc: 'PC',
    ps: 'PlayStation',
    xbox: 'Xbox',
    nintendo: 'Nintendo',
    price: 'Precio',
    rating: 'Calificación',
    addToCart: 'Añadir al Carrito',
    viewDetails: 'Ver Detalles',
    backToHome: 'Volver al Inicio'
  },
  tr: {
    title: 'Elektronik Oyunlar',
    subtitle: 'En son elektronik oyunların geniş koleksiyonumuzu keşfedin',
    filterBy: 'Platforma Göre Filtrele',
    all: 'Tümü',
    pc: 'PC',
    ps: 'PlayStation',
    xbox: 'Xbox',
    nintendo: 'Nintendo',
    price: 'Fiyat',
    rating: 'Değerlendirme',
    addToCart: 'Sepete Ekle',
    viewDetails: 'Detayları Görüntüle',
    backToHome: 'Ana Sayfaya Dön'
  }
}

const games = [
  {
    id: 1,
    name: 'Helldivers 2',
    image: helldivers2,
    platforms: ['PC', 'PlayStation'],
    price: '$39.99',
    rating: 4.8,
    description: {
      ar: 'لعبة إطلاق نار تعاونية مثيرة',
      en: 'Exciting cooperative shooter game',
      fr: 'Jeu de tir coopératif passionnant',
      es: 'Emocionante juego de disparos cooperativo',
      tr: 'Heyecan verici işbirlikçi nişancı oyunu'
    }
  },
  {
    id: 2,
    name: 'Monster Hunter Wilds',
    image: monsterHunterWilds,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    price: '$59.99',
    rating: 4.9,
    description: {
      ar: 'مغامرة صيد الوحوش الملحمية',
      en: 'Epic monster hunting adventure',
      fr: 'Aventure épique de chasse aux monstres',
      es: 'Aventura épica de caza de monstruos',
      tr: 'Destansı canavar avcılığı macerası'
    }
  },
  {
    id: 3,
    name: 'Elden Ring: Shadow of the Erdtree',
    image: eldenRing,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    price: '$39.99',
    rating: 4.9,
    description: {
      ar: 'توسعة ملحمية لعالم Elden Ring',
      en: 'Epic expansion to Elden Ring world',
      fr: 'Extension épique du monde d\'Elden Ring',
      es: 'Expansión épica del mundo de Elden Ring',
      tr: 'Elden Ring dünyasına destansı genişleme'
    }
  },
  {
    id: 4,
    name: 'Assassin\'s Creed Shadows',
    image: assassinsCreed,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    price: '$69.99',
    rating: 4.7,
    description: {
      ar: 'مغامرة الساموراي في اليابان الإقطاعية',
      en: 'Samurai adventure in feudal Japan',
      fr: 'Aventure de samouraï dans le Japon féodal',
      es: 'Aventura de samurái en el Japón feudal',
      tr: 'Feodal Japonya\'da samuray macerası'
    }
  },
  {
    id: 5,
    name: 'Doom: The Dark Ages',
    image: doomDarkAges,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    price: '$59.99',
    rating: 4.8,
    description: {
      ar: 'عصور مظلمة من القتال الشرس',
      en: 'Dark ages of brutal combat',
      fr: 'Âges sombres de combat brutal',
      es: 'Edades oscuras de combate brutal',
      tr: 'Acımasız savaşın karanlık çağları'
    }
  },
  {
    id: 6,
    name: 'Indiana Jones and the Great Circle',
    image: indianaJones,
    platforms: ['PC', 'Xbox'],
    price: '$59.99',
    rating: 4.6,
    description: {
      ar: 'مغامرة أثرية كلاسيكية',
      en: 'Classic archaeological adventure',
      fr: 'Aventure archéologique classique',
      es: 'Aventura arqueológica clásica',
      tr: 'Klasik arkeolojik macera'
    }
  },
  {
    id: 7,
    name: 'Final Fantasy VII Rebirth',
    image: ff7Rebirth,
    platforms: ['PlayStation'],
    price: '$69.99',
    rating: 4.9,
    description: {
      ar: 'إعادة إحياء ملحمة Final Fantasy',
      en: 'Revival of Final Fantasy epic',
      fr: 'Renaissance de l\'épopée Final Fantasy',
      es: 'Renacimiento de la épica Final Fantasy',
      tr: 'Final Fantasy destanının yeniden doğuşu'
    }
  },
  {
    id: 8,
    name: 'Dragon\'s Dogma II',
    image: dragonsDogma,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    price: '$59.99',
    rating: 4.7,
    description: {
      ar: 'مغامرة تنانين ملحمية',
      en: 'Epic dragon adventure',
      fr: 'Aventure épique de dragons',
      es: 'Aventura épica de dragones',
      tr: 'Destansı ejder macerası'
    }
  },
  {
    id: 9,
    name: 'Stellar Blade',
    image: stellarBlade,
    platforms: ['PlayStation'],
    price: '$59.99',
    rating: 4.8,
    description: {
      ar: 'مغامرة خيال علمي مستقبلية',
      en: 'Futuristic sci-fi adventure',
      fr: 'Aventure de science-fiction futuriste',
      es: 'Aventura de ciencia ficción futurista',
      tr: 'Fütüristik bilim kurgu macerası'
    }
  },
  {
    id: 10,
    name: 'Mario Kart World',
    image: marioKart,
    platforms: ['Nintendo'],
    price: '$49.99',
    rating: 4.9,
    description: {
      ar: 'سباق ماريو الكلاسيكي',
      en: 'Classic Mario racing',
      fr: 'Course Mario classique',
      es: 'Carreras clásicas de Mario',
      tr: 'Klasik Mario yarışı'
    }
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
            color="#8b5cf6"
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

function GameCard({ game, language, onAddToCart, onViewDetails }) {
  const t = translations[language]
  
  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 overflow-hidden">
      <div className="relative">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{game.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {game.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3">
          {game.description[language]}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {game.platforms.map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-400">
            {game.price}
          </span>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              onClick={() => onViewDetails(game)}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function GamesPage({ language }) {
  const [selectedPlatform, setSelectedPlatform] = useState('All')
  const t = translations[language]
  
  const platforms = ['All', 'PC', 'PlayStation', 'Xbox', 'Nintendo']
  
  const filteredGames = selectedPlatform === 'All' 
    ? games 
    : games.filter(game => game.platforms.includes(selectedPlatform))

  const handleAddToCart = (game) => {
    // Add to cart functionality
    console.log('Added to cart:', game)
  }

  const handleViewDetails = (game) => {
    // View details functionality
    console.log('View details:', game)
  }

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

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">{t.filterBy}:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? "default" : "outline"}
                className={selectedPlatform === platform 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                  : "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                }
                onClick={() => setSelectedPlatform(platform)}
              >
                {t[platform.toLowerCase()] || platform}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              language={language}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* No results */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {language === 'ar' ? 'لا توجد ألعاب متاحة لهذه المنصة' :
               language === 'en' ? 'No games available for this platform' :
               language === 'fr' ? 'Aucun jeu disponible pour cette plateforme' :
               language === 'es' ? 'No hay juegos disponibles para esta plataforma' :
               'Bu platform için oyun bulunmuyor'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

