import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Card, CardContent } from './ui/card'
import { Shield, DollarSign, Headphones, CheckCircle } from 'lucide-react'

const translations = {
  ar: {
    title: 'لماذا تختار Denima؟',
    subtitle: 'نحن نقدم أفضل الخدمات والمنتجات بجودة عالية وأسعار تنافسية',
    features: [
      {
        title: 'جودة المنتجات',
        description: 'نضمن لك أعلى جودة في جميع منتجاتنا وخدماتنا الرقمية',
        icon: Shield
      },
      {
        title: 'أسعار تنافسية',
        description: 'أفضل الأسعار في السوق مع عروض وخصومات مستمرة',
        icon: DollarSign
      },
      {
        title: 'دعم فني سريع',
        description: 'فريق دعم متاح 24/7 لمساعدتك في أي وقت',
        icon: Headphones
      },
      {
        title: 'ضمان الوصول',
        description: 'نضمن وصول منتجاتك وخدماتك بأسرع وقت ممكن',
        icon: CheckCircle
      }
    ]
  },
  en: {
    title: 'Why Choose Denima?',
    subtitle: 'We provide the best services and products with high quality and competitive prices',
    features: [
      {
        title: 'Product Quality',
        description: 'We guarantee the highest quality in all our products and digital services',
        icon: Shield
      },
      {
        title: 'Competitive Prices',
        description: 'Best prices in the market with continuous offers and discounts',
        icon: DollarSign
      },
      {
        title: 'Fast Technical Support',
        description: '24/7 support team available to help you anytime',
        icon: Headphones
      },
      {
        title: 'Delivery Guarantee',
        description: 'We guarantee the delivery of your products and services as fast as possible',
        icon: CheckCircle
      }
    ]
  },
  fr: {
    title: 'Pourquoi choisir Denima?',
    subtitle: 'Nous fournissons les meilleurs services et produits avec une haute qualité et des prix compétitifs',
    features: [
      {
        title: 'Qualité des Produits',
        description: 'Nous garantissons la plus haute qualité dans tous nos produits et services numériques',
        icon: Shield
      },
      {
        title: 'Prix Compétitifs',
        description: 'Les meilleurs prix du marché avec des offres et remises continues',
        icon: DollarSign
      },
      {
        title: 'Support Technique Rapide',
        description: 'Équipe de support 24/7 disponible pour vous aider à tout moment',
        icon: Headphones
      },
      {
        title: 'Garantie de Livraison',
        description: 'Nous garantissons la livraison de vos produits et services le plus rapidement possible',
        icon: CheckCircle
      }
    ]
  },
  es: {
    title: '¿Por qué elegir Denima?',
    subtitle: 'Proporcionamos los mejores servicios y productos con alta calidad y precios competitivos',
    features: [
      {
        title: 'Calidad de Productos',
        description: 'Garantizamos la más alta calidad en todos nuestros productos y servicios digitales',
        icon: Shield
      },
      {
        title: 'Precios Competitivos',
        description: 'Los mejores precios del mercado con ofertas y descuentos continuos',
        icon: DollarSign
      },
      {
        title: 'Soporte Técnico Rápido',
        description: 'Equipo de soporte 24/7 disponible para ayudarte en cualquier momento',
        icon: Headphones
      },
      {
        title: 'Garantía de Entrega',
        description: 'Garantizamos la entrega de tus productos y servicios lo más rápido posible',
        icon: CheckCircle
      }
    ]
  },
  tr: {
    title: 'Neden Denima\'yı Seçmelisiniz?',
    subtitle: 'Yüksek kalite ve rekabetçi fiyatlarla en iyi hizmet ve ürünleri sunuyoruz',
    features: [
      {
        title: 'Ürün Kalitesi',
        description: 'Tüm ürünlerimizde ve dijital hizmetlerimizde en yüksek kaliteyi garanti ediyoruz',
        icon: Shield
      },
      {
        title: 'Rekabetçi Fiyatlar',
        description: 'Sürekli teklifler ve indirimlerle piyasadaki en iyi fiyatlar',
        icon: DollarSign
      },
      {
        title: 'Hızlı Teknik Destek',
        description: 'Size her zaman yardımcı olmak için 7/24 destek ekibi',
        icon: Headphones
      },
      {
        title: 'Teslimat Garantisi',
        description: 'Ürünlerinizin ve hizmetlerinizin mümkün olan en hızlı şekilde teslimini garanti ediyoruz',
        icon: CheckCircle
      }
    ]
  }
}

function AnimatedBackground() {
  const sphereRef = useRef()
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={sphereRef} args={[3, 64, 64]} position={[0, 0, -5]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.8}
          transparent
          opacity={0.1}
        />
      </Sphere>
    </Float>
  )
}

function FeatureCard({ feature, index, language }) {
  const { title, description, icon: Icon } = feature
  
  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 h-full">
      <CardContent className="p-6 text-center h-full flex flex-col">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-3">
            {title}
          </h3>
        </div>
        <p className="text-gray-400 leading-relaxed flex-grow">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default function WhyChooseUs({ language }) {
  const t = translations[language]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ec4899" />
          
          <AnimatedBackground />
          
          {/* Floating geometric shapes */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[-4, 2, 0]}>
              <octahedronGeometry args={[0.5]} />
              <meshStandardMaterial color="#8b5cf6" wireframe />
            </mesh>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh position={[4, -2, 1]}>
              <tetrahedronGeometry args={[0.7]} />
              <meshStandardMaterial color="#ec4899" wireframe />
            </mesh>
          </Float>
          
          <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.5}>
            <mesh position={[0, 3, -2]}>
              <icosahedronGeometry args={[0.4]} />
              <meshStandardMaterial color="#06b6d4" wireframe />
            </mesh>
          </Float>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              language={language}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                1000+
              </span>
            </div>
            <p className="text-gray-400">
              {language === 'ar' ? 'عميل راضٍ' : 
               language === 'en' ? 'Happy Customers' :
               language === 'fr' ? 'Clients Satisfaits' :
               language === 'es' ? 'Clientes Felices' :
               'Mutlu Müşteri'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                50+
              </span>
            </div>
            <p className="text-gray-400">
              {language === 'ar' ? 'منتج متاح' : 
               language === 'en' ? 'Products Available' :
               language === 'fr' ? 'Produits Disponibles' :
               language === 'es' ? 'Productos Disponibles' :
               'Mevcut Ürün'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                24/7
              </span>
            </div>
            <p className="text-gray-400">
              {language === 'ar' ? 'دعم فني' : 
               language === 'en' ? 'Technical Support' :
               language === 'fr' ? 'Support Technique' :
               language === 'es' ? 'Soporte Técnico' :
               'Teknik Destek'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                99%
              </span>
            </div>
            <p className="text-gray-400">
              {language === 'ar' ? 'معدل النجاح' : 
               language === 'en' ? 'Success Rate' :
               language === 'fr' ? 'Taux de Réussite' :
               language === 'es' ? 'Tasa de Éxito' :
               'Başarı Oranı'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

