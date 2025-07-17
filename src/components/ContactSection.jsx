import { Canvas } from '@react-three/fiber'
import { Float, Text3D, Center } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Card, CardContent } from './ui/card'
import { MessageCircle, Phone, Mail } from 'lucide-react'

const translations = {
  ar: {
    title: 'تواصل معنا',
    subtitle: 'نحن هنا لمساعدتك في أي وقت. تواصل معنا عبر الطرق التالية',
    whatsapp: {
      title: 'واتساب',
      description: 'محادثة مباشرة وسريعة',
      action: 'بدء المحادثة'
    },
    phone: {
      title: 'اتصال مباشر',
      description: 'تحدث معنا مباشرة',
      action: 'اتصل الآن'
    },
    email: {
      title: 'بريد إلكتروني',
      description: 'أرسل لنا رسالة مفصلة',
      action: 'إرسال رسالة'
    },
    footer: 'شكراً لاختيارك Denima - وجهتك الأولى للألعاب والخدمات الرقمية'
  },
  en: {
    title: 'Contact Us',
    subtitle: 'We are here to help you anytime. Contact us through the following methods',
    whatsapp: {
      title: 'WhatsApp',
      description: 'Direct and fast chat',
      action: 'Start Chat'
    },
    phone: {
      title: 'Direct Call',
      description: 'Talk to us directly',
      action: 'Call Now'
    },
    email: {
      title: 'Email',
      description: 'Send us a detailed message',
      action: 'Send Message'
    },
    footer: 'Thank you for choosing Denima - Your premier destination for games and digital services'
  },
  fr: {
    title: 'Nous Contacter',
    subtitle: 'Nous sommes là pour vous aider à tout moment. Contactez-nous par les méthodes suivantes',
    whatsapp: {
      title: 'WhatsApp',
      description: 'Chat direct et rapide',
      action: 'Commencer le Chat'
    },
    phone: {
      title: 'Appel Direct',
      description: 'Parlez-nous directement',
      action: 'Appeler Maintenant'
    },
    email: {
      title: 'Email',
      description: 'Envoyez-nous un message détaillé',
      action: 'Envoyer Message'
    },
    footer: 'Merci d\'avoir choisi Denima - Votre destination de choix pour les jeux et services numériques'
  },
  es: {
    title: 'Contáctanos',
    subtitle: 'Estamos aquí para ayudarte en cualquier momento. Contáctanos a través de los siguientes métodos',
    whatsapp: {
      title: 'WhatsApp',
      description: 'Chat directo y rápido',
      action: 'Iniciar Chat'
    },
    phone: {
      title: 'Llamada Directa',
      description: 'Habla con nosotros directamente',
      action: 'Llamar Ahora'
    },
    email: {
      title: 'Email',
      description: 'Envíanos un mensaje detallado',
      action: 'Enviar Mensaje'
    },
    footer: 'Gracias por elegir Denima - Tu destino principal para juegos y servicios digitales'
  },
  tr: {
    title: 'Bize Ulaşın',
    subtitle: 'Size her zaman yardımcı olmak için buradayız. Aşağıdaki yöntemlerle bize ulaşın',
    whatsapp: {
      title: 'WhatsApp',
      description: 'Doğrudan ve hızlı sohbet',
      action: 'Sohbeti Başlat'
    },
    phone: {
      title: 'Doğrudan Arama',
      description: 'Bizimle doğrudan konuşun',
      action: 'Şimdi Ara'
    },
    email: {
      title: 'Email',
      description: 'Bize detaylı bir mesaj gönderin',
      action: 'Mesaj Gönder'
    },
    footer: 'Denima\'yı seçtiğiniz için teşekkürler - Oyunlar ve dijital hizmetler için birinci hedefiniz'
  }
}

function FloatingContactIcon({ position, color, scale = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  )
}

function ContactCard({ icon: Icon, title, description, action, onClick, color }) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 cursor-pointer h-full" onClick={onClick}>
      <CardContent className="p-8 text-center h-full flex flex-col">
        <div className="mb-6">
          <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors mb-3">
            {title}
          </h3>
        </div>
        <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <div className={`px-6 py-3 bg-gradient-to-r ${color} text-white font-semibold rounded-lg group-hover:shadow-lg transition-all duration-300`}>
          {action}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ContactSection({ language }) {
  const t = translations[language]

  const handleWhatsApp = () => {
    // Updated WhatsApp number
    window.open('https://wa.me/212633785269', '_blank')
  }

  const handlePhone = () => {
    // Updated phone number
    window.open('tel:+212633785269', '_blank')
  }

  const handleEmail = () => {
    // Updated email
    window.open('mailto:stoream665@gmail.com', '_blank')
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
          
          <FloatingContactIcon position={[-6, 2, 0]} color="#25d366" scale={1.2} />
          <FloatingContactIcon position={[6, -1, 1]} color="#1877f2" scale={1} />
          <FloatingContactIcon position={[0, 3, -2]} color="#ea4335" scale={0.8} />
          <FloatingContactIcon position={[-4, -2, 2]} color="#8b5cf6" scale={0.6} />
          <FloatingContactIcon position={[4, 2, -1]} color="#ec4899" scale={0.9} />
          
          {/* Floating geometric shapes */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[-8, 0, 0]}>
              <torusGeometry args={[0.5, 0.2, 16, 100]} />
              <meshStandardMaterial color="#8b5cf6" wireframe />
            </mesh>
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh position={[8, 1, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
              <meshStandardMaterial color="#ec4899" wireframe />
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

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ContactCard
            icon={MessageCircle}
            title={t.whatsapp.title}
            description={t.whatsapp.description}
            action={t.whatsapp.action}
            onClick={handleWhatsApp}
            color="from-green-500 to-green-600"
          />
          
          <ContactCard
            icon={Phone}
            title={t.phone.title}
            description={t.phone.description}
            action={t.phone.action}
            onClick={handlePhone}
            color="from-blue-500 to-blue-600"
          />
          
          <ContactCard
            icon={Mail}
            title={t.email.title}
            description={t.email.description}
            action={t.email.action}
            onClick={handleEmail}
            color="from-red-500 to-red-600"
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="bg-black/40 backdrop-blur-md border-white/20 rounded-lg p-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              {t.footer}
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

