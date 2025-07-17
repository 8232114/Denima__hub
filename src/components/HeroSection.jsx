import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const translations = {
  ar: {
    welcome: 'مرحباً بك في عالم Denima',
    subtitle: 'وجهتك الأولى للألعاب الإلكترونية والخدمات الترفيهية',
    description: 'اكتشف مجموعة واسعة من الألعاب الحديثة، الحسابات الترفيهية المميزة، والخدمات الرقمية عالية الجودة',
    cta: 'استكشف منتجاتنا'
  },
  en: {
    welcome: 'Welcome to Denima World',
    subtitle: 'Your premier destination for electronic games and entertainment services',
    description: 'Discover a wide range of modern games, premium entertainment accounts, and high-quality digital services',
    cta: 'Explore Our Products'
  },
  fr: {
    welcome: 'Bienvenue dans le monde Denima',
    subtitle: 'Votre destination de choix pour les jeux électroniques et services de divertissement',
    description: 'Découvrez une large gamme de jeux modernes, comptes de divertissement premium et services numériques de haute qualité',
    cta: 'Explorez nos produits'
  },
  es: {
    welcome: 'Bienvenido al mundo Denima',
    subtitle: 'Tu destino principal para juegos electrónicos y servicios de entretenimiento',
    description: 'Descubre una amplia gama de juegos modernos, cuentas de entretenimiento premium y servicios digitales de alta calidad',
    cta: 'Explora nuestros productos'
  },
  tr: {
    welcome: 'Denima Dünyasına Hoş Geldiniz',
    subtitle: 'Elektronik oyunlar ve eğlence hizmetleri için birinci hedefiniz',
    description: 'Modern oyunların geniş yelpazesini, premium eğlence hesaplarını ve yüksek kaliteli dijital hizmetleri keşfedin',
    cta: 'Ürünlerimizi Keşfedin'
  }
}

function AnimatedSphere() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
        />
      </Sphere>
    </Float>
  )
}

function GameController() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Controller Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1, 0.3]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        
        {/* D-Pad */}
        <mesh position={[-0.6, 0.1, 0.16]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <mesh position={[-0.6, 0.1, 0.16]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        
        {/* Action Buttons */}
        <mesh position={[0.6, 0.1, 0.16]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0.4, 0.2, 0.16]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <mesh position={[0.8, 0.2, 0.16]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0.6, 0.3, 0.16]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        
        {/* Analog Sticks */}
        <mesh position={[-0.3, -0.2, 0.16]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
        <mesh position={[0.3, -0.2, 0.16]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroSection({ language }) {
  const t = translations[language]

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <div className="text-center lg:text-right space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                {t.welcome}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
              {t.subtitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
              {t.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToProducts}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              {t.cta}
            </button>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="h-96 lg:h-[500px] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            
            <group position={[0, 0, 0]}>
              <AnimatedSphere />
              <group position={[3, 1, 0]} scale={0.5}>
                <GameController />
              </group>
              <group position={[-3, -1, 0]} scale={0.3}>
                <Float speed={3} rotationIntensity={2} floatIntensity={3}>
                  <mesh>
                    <octahedronGeometry args={[1]} />
                    <meshStandardMaterial color="#ec4899" wireframe />
                  </mesh>
                </Float>
              </group>
            </group>
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

