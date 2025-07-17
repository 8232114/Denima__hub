import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react'

const translations = {
  ar: {
    title: 'تسجيل دخول المسؤول',
    subtitle: 'الوصول إلى لوحة التحكم الإدارية',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    forgotPassword: 'نسيت كلمة المرور؟',
    secureLogin: 'تسجيل دخول آمن',
    adminOnly: 'للمسؤولين فقط',
    enterCredentials: 'أدخل بيانات الاعتماد الخاصة بك',
    invalidCredentials: 'بيانات الاعتماد غير صحيحة',
    loginSuccess: 'تم تسجيل الدخول بنجاح'
  },
  en: {
    title: 'Admin Login',
    subtitle: 'Access to administrative control panel',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    forgotPassword: 'Forgot Password?',
    secureLogin: 'Secure Login',
    adminOnly: 'Administrators Only',
    enterCredentials: 'Enter your credentials',
    invalidCredentials: 'Invalid credentials',
    loginSuccess: 'Login successful'
  },
  fr: {
    title: 'Connexion Admin',
    subtitle: 'Accès au panneau de contrôle administratif',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    login: 'Se connecter',
    forgotPassword: 'Mot de passe oublié?',
    secureLogin: 'Connexion Sécurisée',
    adminOnly: 'Administrateurs Seulement',
    enterCredentials: 'Entrez vos identifiants',
    invalidCredentials: 'Identifiants invalides',
    loginSuccess: 'Connexion réussie'
  },
  es: {
    title: 'Inicio de Sesión Admin',
    subtitle: 'Acceso al panel de control administrativo',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    login: 'Iniciar Sesión',
    forgotPassword: '¿Olvidaste la contraseña?',
    secureLogin: 'Inicio de Sesión Seguro',
    adminOnly: 'Solo Administradores',
    enterCredentials: 'Ingresa tus credenciales',
    invalidCredentials: 'Credenciales inválidas',
    loginSuccess: 'Inicio de sesión exitoso'
  },
  tr: {
    title: 'Admin Girişi',
    subtitle: 'Yönetici kontrol paneline erişim',
    username: 'Kullanıcı adı',
    password: 'Şifre',
    login: 'Giriş Yap',
    forgotPassword: 'Şifremi Unuttum?',
    secureLogin: 'Güvenli Giriş',
    adminOnly: 'Sadece Yöneticiler',
    enterCredentials: 'Kimlik bilgilerinizi girin',
    invalidCredentials: 'Geçersiz kimlik bilgileri',
    loginSuccess: 'Giriş başarılı'
  }
}

function AnimatedBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      
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
      
      {/* Floating security icons */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, 0]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[3, -2, 1]}>
          <tetrahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.5}>
        <mesh position={[0, 3, -2]}>
          <icosahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      </Float>
    </Canvas>
  )
}

export default function AdminLogin({ language, setCurrentPage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const t = translations[language]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Simulate login process
    setTimeout(() => {
      if (username === 'admin' && password === 'denima2024') {
        setSuccess(t.loginSuccess)
        // Redirect to admin dashboard
        setTimeout(() => {
          setCurrentPage('admin-dashboard')
        }, 1000)
      } else {
        setError(t.invalidCredentials)
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden flex items-center justify-center">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <AnimatedBackground />
      </div>

      {/* Security particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="bg-black/40 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </CardTitle>
              <p className="text-gray-400">{t.subtitle}</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400">{t.secureLogin}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Admin Only Notice */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                <p className="text-purple-400 text-sm font-medium">{t.adminOnly}</p>
                <p className="text-gray-400 text-xs mt-1">{t.enterCredentials}</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <p className="text-green-400 text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    {t.username}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-purple-500"
                      placeholder={t.username}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    {t.password}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-purple-500"
                      placeholder={t.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    t.login
                  )}
                </Button>

                {/* Forgot Password */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    {t.forgotPassword}
                  </button>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs mb-2">Demo Credentials:</p>
                <p className="text-gray-300 text-xs">Username: admin</p>
                <p className="text-gray-300 text-xs">Password: denima2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

