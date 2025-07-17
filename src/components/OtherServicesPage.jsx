import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useState } from 'react'
import { 
  Monitor, 
  Palette, 
  Video, 
  Users, 
  Globe, 
  ShoppingCart,
  Star,
  CheckCircle,
  Instagram,
  Youtube,
  Heart,
  Eye,
  UserPlus,
  Camera,
  Edit3,
  Briefcase,
  FileText
} from 'lucide-react'

// Import icons
import windowsIcon from '../assets/images/windows-icon.png'
import followersIcon from '../assets/images/followers-icon.png'

const translations = {
  ar: {
    title: 'خدمات رقمية أخرى',
    subtitle: 'خدمات رقمية متنوعة ومنظمة لتلبية جميع احتياجاتك التقنية',
    orderNow: 'اطلب الآن',
    features: 'الميزات',
    popular: 'الأكثر شعبية',
    price: 'السعر',
    delivery: 'التسليم',
    categories: {
      windows: 'تفعيل Windows',
      accounts: 'الحسابات',
      followers: 'زيادة المتابعين',
      websites: 'إنشاء مواقع ويب'
    }
  },
  en: {
    title: 'Other Digital Services',
    subtitle: 'Organized and diverse digital services to meet all your technical needs',
    orderNow: 'Order Now',
    features: 'Features',
    popular: 'Most Popular',
    price: 'Price',
    delivery: 'Delivery',
    categories: {
      windows: 'Windows Activation',
      accounts: 'Accounts',
      followers: 'Followers Boost',
      websites: 'Website Creation'
    }
  },
  fr: {
    title: 'Autres Services Numériques',
    subtitle: 'Services numériques organisés et variés pour répondre à tous vos besoins techniques',
    orderNow: 'Commander Maintenant',
    features: 'Fonctionnalités',
    popular: 'Le Plus Populaire',
    price: 'Prix',
    delivery: 'Livraison',
    categories: {
      windows: 'Activation Windows',
      accounts: 'Comptes',
      followers: 'Augmentation Followers',
      websites: 'Création Sites Web'
    }
  },
  es: {
    title: 'Otros Servicios Digitales',
    subtitle: 'Servicios digitales organizados y variados para satisfacer todas tus necesidades técnicas',
    orderNow: 'Ordenar Ahora',
    features: 'Características',
    popular: 'Más Popular',
    price: 'Precio',
    delivery: 'Entrega',
    categories: {
      windows: 'Activación Windows',
      accounts: 'Cuentas',
      followers: 'Aumento Seguidores',
      websites: 'Creación Sitios Web'
    }
  },
  tr: {
    title: 'Diğer Dijital Hizmetler',
    subtitle: 'Tüm teknik ihtiyaçlarınızı karşılamak için organize edilmiş ve çeşitli dijital hizmetler',
    orderNow: 'Şimdi Sipariş Ver',
    features: 'Özellikler',
    popular: 'En Popüler',
    price: 'Fiyat',
    delivery: 'Teslimat',
    categories: {
      windows: 'Windows Etkinleştirme',
      accounts: 'Hesaplar',
      followers: 'Takipçi Artırma',
      websites: 'Web Sitesi Oluşturma'
    }
  }
}

const serviceCategories = {
  windows: {
    icon: Monitor,
    color: 'from-blue-600 to-blue-800',
    iconSrc: windowsIcon,
    services: [
      {
        id: 'win11pro',
        name: { ar: 'Windows 11 Pro', en: 'Windows 11 Pro', fr: 'Windows 11 Pro', es: 'Windows 11 Pro', tr: 'Windows 11 Pro' },
        description: { ar: 'تفعيل Windows 11 Pro مع جميع الميزات المتقدمة', en: 'Activate Windows 11 Pro with all advanced features', fr: 'Activez Windows 11 Pro avec toutes les fonctionnalités avancées', es: 'Activa Windows 11 Pro con todas las características avanzadas', tr: 'Tüm gelişmiş özelliklerle Windows 11 Pro\'yu etkinleştirin' },
        price: '$19.99',
        delivery: '5 دقائق',
        popular: true,
        features: { ar: ['ضمان مدى الحياة', 'تفعيل فوري', 'دعم فني', 'جميع التحديثات'], en: ['Lifetime Guarantee', 'Instant Activation', 'Technical Support', 'All Updates'], fr: ['Garantie à Vie', 'Activation Instantanée', 'Support Technique', 'Toutes les Mises à Jour'], es: ['Garantía de por Vida', 'Activación Instantánea', 'Soporte Técnico', 'Todas las Actualizaciones'], tr: ['Yaşam Boyu Garanti', 'Anında Etkinleştirme', 'Teknik Destek', 'Tüm Güncellemeler'] }
      },
      {
        id: 'win10pro',
        name: { ar: 'Windows 10 Pro', en: 'Windows 10 Pro', fr: 'Windows 10 Pro', es: 'Windows 10 Pro', tr: 'Windows 10 Pro' },
        description: { ar: 'تفعيل Windows 10 Pro للاستخدام المهني', en: 'Activate Windows 10 Pro for professional use', fr: 'Activez Windows 10 Pro pour un usage professionnel', es: 'Activa Windows 10 Pro para uso profesional', tr: 'Profesyonel kullanım için Windows 10 Pro\'yu etkinleştirin' },
        price: '$15.99',
        delivery: '5 دقائق',
        features: { ar: ['ضمان مدى الحياة', 'تفعيل فوري', 'دعم فني'], en: ['Lifetime Guarantee', 'Instant Activation', 'Technical Support'], fr: ['Garantie à Vie', 'Activation Instantanée', 'Support Technique'], es: ['Garantía de por Vida', 'Activación Instantánea', 'Soporte Técnico'], tr: ['Yaşam Boyu Garanti', 'Anında Etkinleştirme', 'Teknik Destek'] }
      },
      {
        id: 'win11home',
        name: { ar: 'Windows 11 Home', en: 'Windows 11 Home', fr: 'Windows 11 Home', es: 'Windows 11 Home', tr: 'Windows 11 Home' },
        description: { ar: 'تفعيل Windows 11 Home للاستخدام المنزلي', en: 'Activate Windows 11 Home for home use', fr: 'Activez Windows 11 Home pour un usage domestique', es: 'Activa Windows 11 Home para uso doméstico', tr: 'Ev kullanımı için Windows 11 Home\'u etkinleştirin' },
        price: '$12.99',
        delivery: '5 دقائق',
        features: { ar: ['ضمان مدى الحياة', 'تفعيل فوري', 'دعم فني'], en: ['Lifetime Guarantee', 'Instant Activation', 'Technical Support'], fr: ['Garantie à Vie', 'Activation Instantanée', 'Support Technique'], es: ['Garantía de por Vida', 'Activación Instantánea', 'Soporte Técnico'], tr: ['Yaşam Boyu Garanti', 'Anında Etkinleştirme', 'Teknik Destek'] }
      },
      {
        id: 'win10home',
        name: { ar: 'Windows 10 Home', en: 'Windows 10 Home', fr: 'Windows 10 Home', es: 'Windows 10 Home', tr: 'Windows 10 Home' },
        description: { ar: 'تفعيل Windows 10 Home للاستخدام المنزلي', en: 'Activate Windows 10 Home for home use', fr: 'Activez Windows 10 Home pour un usage domestique', es: 'Activa Windows 10 Home para uso doméstico', tr: 'Ev kullanımı için Windows 10 Home\'u etkinleştirin' },
        price: '$9.99',
        delivery: '5 دقائق',
        features: { ar: ['ضمان مدى الحياة', 'تفعيل فوري', 'دعم فني'], en: ['Lifetime Guarantee', 'Instant Activation', 'Technical Support'], fr: ['Garantie à Vie', 'Activation Instantanée', 'Support Technique'], es: ['Garantía de por Vida', 'Activación Instantánea', 'Soporte Técnico'], tr: ['Yaşam Boyu Garanti', 'Anında Etkinleştirme', 'Teknik Destek'] }
      }
    ]
  },
  accounts: {
    icon: Palette,
    color: 'from-purple-600 to-pink-600',
    services: [
      {
        id: 'canva',
        name: { ar: 'حسابات Canva Pro', en: 'Canva Pro Accounts', fr: 'Comptes Canva Pro', es: 'Cuentas Canva Pro', tr: 'Canva Pro Hesapları' },
        description: { ar: 'حسابات Canva Pro مع جميع الميزات المتقدمة', en: 'Canva Pro accounts with all advanced features', fr: 'Comptes Canva Pro avec toutes les fonctionnalités avancées', es: 'Cuentas Canva Pro con todas las características avanzadas', tr: 'Tüm gelişmiş özelliklerle Canva Pro hesapları' },
        price: '$12.99/شهر',
        delivery: '10 دقائق',
        popular: true,
        features: { ar: ['قوالب مميزة', 'خلفيات شفافة', 'تحميل غير محدود', 'مكتبة ضخمة'], en: ['Premium Templates', 'Transparent Backgrounds', 'Unlimited Downloads', 'Huge Library'], fr: ['Modèles Premium', 'Arrière-plans Transparents', 'Téléchargements Illimités', 'Bibliothèque Énorme'], es: ['Plantillas Premium', 'Fondos Transparentes', 'Descargas Ilimitadas', 'Biblioteca Enorme'], tr: ['Premium Şablonlar', 'Şeffaf Arka Planlar', 'Sınırsız İndirme', 'Büyük Kütüphane'] }
      },
      {
        id: 'capcut',
        name: { ar: 'حسابات CapCut Pro', en: 'CapCut Pro Accounts', fr: 'Comptes CapCut Pro', es: 'Cuentas CapCut Pro', tr: 'CapCut Pro Hesapları' },
        description: { ar: 'حسابات CapCut Pro لتحرير الفيديو الاحترافي', en: 'CapCut Pro accounts for professional video editing', fr: 'Comptes CapCut Pro pour l\'édition vidéo professionnelle', es: 'Cuentas CapCut Pro para edición de video profesional', tr: 'Profesyonel video düzenleme için CapCut Pro hesapları' },
        price: '$9.99/شهر',
        delivery: '15 دقيقة',
        features: { ar: ['تأثيرات متقدمة', 'قوالب حصرية', 'تصدير عالي الجودة', 'بدون علامة مائية'], en: ['Advanced Effects', 'Exclusive Templates', 'High Quality Export', 'No Watermark'], fr: ['Effets Avancés', 'Modèles Exclusifs', 'Export Haute Qualité', 'Sans Filigrane'], es: ['Efectos Avanzados', 'Plantillas Exclusivas', 'Exportación de Alta Calidad', 'Sin Marca de Agua'], tr: ['Gelişmiş Efektler', 'Özel Şablonlar', 'Yüksek Kalite Dışa Aktarma', 'Filigran Yok'] }
      },
      {
        id: 'adobe',
        name: { ar: 'حسابات Adobe Creative Suite', en: 'Adobe Creative Suite Accounts', fr: 'Comptes Adobe Creative Suite', es: 'Cuentas Adobe Creative Suite', tr: 'Adobe Creative Suite Hesapları' },
        description: { ar: 'حسابات Adobe مع جميع التطبيقات الإبداعية', en: 'Adobe accounts with all creative applications', fr: 'Comptes Adobe avec toutes les applications créatives', es: 'Cuentas Adobe con todas las aplicaciones creativas', tr: 'Tüm yaratıcı uygulamalarla Adobe hesapları' },
        price: '$29.99/شهر',
        delivery: '20 دقيقة',
        features: { ar: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'InDesign'], en: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'InDesign'], fr: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'InDesign'], es: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'InDesign'], tr: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'InDesign'] }
      },
      {
        id: 'office',
        name: { ar: 'حسابات Microsoft Office', en: 'Microsoft Office Accounts', fr: 'Comptes Microsoft Office', es: 'Cuentas Microsoft Office', tr: 'Microsoft Office Hesapları' },
        description: { ar: 'حسابات Microsoft Office 365 مع جميع التطبيقات', en: 'Microsoft Office 365 accounts with all applications', fr: 'Comptes Microsoft Office 365 avec toutes les applications', es: 'Cuentas Microsoft Office 365 con todas las aplicaciones', tr: 'Tüm uygulamalarla Microsoft Office 365 hesapları' },
        price: '$8.99/شهر',
        delivery: '10 دقائق',
        features: { ar: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneDrive 1TB'], en: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneDrive 1TB'], fr: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneDrive 1TB'], es: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneDrive 1TB'], tr: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneDrive 1TB'] }
      }
    ]
  },
  followers: {
    icon: Users,
    color: 'from-green-600 to-teal-600',
    iconSrc: followersIcon,
    services: [
      {
        id: 'instagram-followers',
        name: { ar: 'متابعين Instagram', en: 'Instagram Followers', fr: 'Followers Instagram', es: 'Seguidores Instagram', tr: 'Instagram Takipçileri' },
        description: { ar: 'زيادة متابعين Instagram حقيقيين وآمنين', en: 'Increase real and safe Instagram followers', fr: 'Augmentez les followers Instagram réels et sûrs', es: 'Aumenta seguidores reales y seguros de Instagram', tr: 'Gerçek ve güvenli Instagram takipçilerini artırın' },
        price: 'من $19.99',
        delivery: '24-48 ساعة',
        popular: true,
        features: { ar: ['متابعين حقيقيين', 'نمو تدريجي', 'ضمان الجودة', 'دعم مستمر'], en: ['Real Followers', 'Gradual Growth', 'Quality Guarantee', 'Ongoing Support'], fr: ['Vrais Followers', 'Croissance Graduelle', 'Garantie Qualité', 'Support Continu'], es: ['Seguidores Reales', 'Crecimiento Gradual', 'Garantía de Calidad', 'Soporte Continuo'], tr: ['Gerçek Takipçiler', 'Kademeli Büyüme', 'Kalite Garantisi', 'Sürekli Destek'] }
      },
      {
        id: 'tiktok-followers',
        name: { ar: 'متابعين TikTok', en: 'TikTok Followers', fr: 'Followers TikTok', es: 'Seguidores TikTok', tr: 'TikTok Takipçileri' },
        description: { ar: 'زيادة متابعين TikTok لتوسيع جمهورك', en: 'Increase TikTok followers to expand your audience', fr: 'Augmentez les followers TikTok pour élargir votre audience', es: 'Aumenta seguidores de TikTok para expandir tu audiencia', tr: 'Kitlenizi genişletmek için TikTok takipçilerini artırın' },
        price: 'من $15.99',
        delivery: '24-48 ساعة',
        features: { ar: ['متابعين نشطين', 'نمو طبيعي', 'ضمان الأمان', 'دعم فني'], en: ['Active Followers', 'Natural Growth', 'Safety Guarantee', 'Technical Support'], fr: ['Followers Actifs', 'Croissance Naturelle', 'Garantie Sécurité', 'Support Technique'], es: ['Seguidores Activos', 'Crecimiento Natural', 'Garantía de Seguridad', 'Soporte Técnico'], tr: ['Aktif Takipçiler', 'Doğal Büyüme', 'Güvenlik Garantisi', 'Teknik Destek'] }
      },
      {
        id: 'youtube-subscribers',
        name: { ar: 'متابعين YouTube', en: 'YouTube Subscribers', fr: 'Abonnés YouTube', es: 'Suscriptores YouTube', tr: 'YouTube Aboneleri' },
        description: { ar: 'زيادة مشتركين YouTube لقناتك', en: 'Increase YouTube subscribers for your channel', fr: 'Augmentez les abonnés YouTube pour votre chaîne', es: 'Aumenta suscriptores de YouTube para tu canal', tr: 'Kanalınız için YouTube abonelerini artırın' },
        price: 'من $25.99',
        delivery: '48-72 ساعة',
        features: { ar: ['مشتركين حقيقيين', 'نمو آمن', 'ضمان الجودة', 'دعم مستمر'], en: ['Real Subscribers', 'Safe Growth', 'Quality Guarantee', 'Ongoing Support'], fr: ['Vrais Abonnés', 'Croissance Sûre', 'Garantie Qualité', 'Support Continu'], es: ['Suscriptores Reales', 'Crecimiento Seguro', 'Garantía de Calidad', 'Soporte Continuo'], tr: ['Gerçek Aboneler', 'Güvenli Büyüme', 'Kalite Garantisi', 'Sürekli Destek'] }
      },
      {
        id: 'instagram-likes',
        name: { ar: 'لايكات Instagram', en: 'Instagram Likes', fr: 'Likes Instagram', es: 'Likes Instagram', tr: 'Instagram Beğenileri' },
        description: { ar: 'زيادة الإعجابات على منشوراتك في Instagram', en: 'Increase likes on your Instagram posts', fr: 'Augmentez les likes sur vos publications Instagram', es: 'Aumenta likes en tus publicaciones de Instagram', tr: 'Instagram gönderilerinizde beğenileri artırın' },
        price: 'من $5.99',
        delivery: '1-6 ساعات',
        features: { ar: ['إعجابات حقيقية', 'تسليم سريع', 'ضمان الأمان', 'أسعار تنافسية'], en: ['Real Likes', 'Fast Delivery', 'Safety Guarantee', 'Competitive Prices'], fr: ['Vrais Likes', 'Livraison Rapide', 'Garantie Sécurité', 'Prix Compétitifs'], es: ['Likes Reales', 'Entrega Rápida', 'Garantía de Seguridad', 'Precios Competitivos'], tr: ['Gerçek Beğeniler', 'Hızlı Teslimat', 'Güvenlik Garantisi', 'Rekabetçi Fiyatlar'] }
      },
      {
        id: 'youtube-views',
        name: { ar: 'مشاهدات YouTube', en: 'YouTube Views', fr: 'Vues YouTube', es: 'Visualizaciones YouTube', tr: 'YouTube İzlenmeleri' },
        description: { ar: 'زيادة مشاهدات فيديوهاتك على YouTube', en: 'Increase views on your YouTube videos', fr: 'Augmentez les vues sur vos vidéos YouTube', es: 'Aumenta visualizaciones en tus videos de YouTube', tr: 'YouTube videolarınızda izlenmeleri artırın' },
        price: 'من $3.99',
        delivery: '12-24 ساعة',
        features: { ar: ['مشاهدات حقيقية', 'تسليم تدريجي', 'ضمان الأمان', 'دعم فني'], en: ['Real Views', 'Gradual Delivery', 'Safety Guarantee', 'Technical Support'], fr: ['Vraies Vues', 'Livraison Graduelle', 'Garantie Sécurité', 'Support Technique'], es: ['Visualizaciones Reales', 'Entrega Gradual', 'Garantía de Seguridad', 'Soporte Técnico'], tr: ['Gerçek İzlenmeler', 'Kademeli Teslimat', 'Güvenlik Garantisi', 'Teknik Destek'] }
      },
      {
        id: 'tiktok-likes',
        name: { ar: 'تفاعل TikTok', en: 'TikTok Engagement', fr: 'Engagement TikTok', es: 'Interacción TikTok', tr: 'TikTok Etkileşimi' },
        description: { ar: 'زيادة الإعجابات والتفاعل على TikTok', en: 'Increase likes and engagement on TikTok', fr: 'Augmentez les likes et l\'engagement sur TikTok', es: 'Aumenta likes e interacción en TikTok', tr: 'TikTok\'ta beğeni ve etkileşimi artırın' },
        price: 'من $7.99',
        delivery: '6-12 ساعة',
        features: { ar: ['تفاعل حقيقي', 'تسليم سريع', 'ضمان الجودة', 'أسعار مناسبة'], en: ['Real Engagement', 'Fast Delivery', 'Quality Guarantee', 'Affordable Prices'], fr: ['Engagement Réel', 'Livraison Rapide', 'Garantie Qualité', 'Prix Abordables'], es: ['Interacción Real', 'Entrega Rápida', 'Garantía de Calidad', 'Precios Asequibles'], tr: ['Gerçek Etkileşim', 'Hızlı Teslimat', 'Kalite Garantisi', 'Uygun Fiyatlar'] }
      }
    ]
  },
  websites: {
    icon: Globe,
    color: 'from-cyan-600 to-blue-600',
    services: [
      {
        id: 'custom-website',
        name: { ar: 'موقع إلكتروني خاص', en: 'Custom Website', fr: 'Site Web Personnalisé', es: 'Sitio Web Personalizado', tr: 'Özel Web Sitesi' },
        description: { ar: 'تصميم وتطوير موقع إلكتروني مخصص حسب احتياجاتك', en: 'Design and develop a custom website according to your needs', fr: 'Concevez et développez un site web personnalisé selon vos besoins', es: 'Diseña y desarrolla un sitio web personalizado según tus necesidades', tr: 'İhtiyaçlarınıza göre özel bir web sitesi tasarlayın ve geliştirin' },
        price: 'من $299.99',
        delivery: '5-10 أيام',
        popular: true,
        features: { ar: ['تصميم متجاوب', 'تحسين محركات البحث', 'لوحة تحكم', 'استضافة مجانية لسنة'], en: ['Responsive Design', 'SEO Optimization', 'Admin Panel', 'Free Hosting for 1 Year'], fr: ['Design Responsive', 'Optimisation SEO', 'Panneau Admin', 'Hébergement Gratuit 1 An'], es: ['Diseño Responsivo', 'Optimización SEO', 'Panel Admin', 'Hosting Gratuito 1 Año'], tr: ['Duyarlı Tasarım', 'SEO Optimizasyonu', 'Yönetici Paneli', '1 Yıl Ücretsiz Hosting'] }
      },
      {
        id: 'ecommerce-store',
        name: { ar: 'متجر إلكتروني', en: 'E-commerce Store', fr: 'Boutique E-commerce', es: 'Tienda E-commerce', tr: 'E-ticaret Mağazası' },
        description: { ar: 'إنشاء متجر إلكتروني متكامل لبيع منتجاتك', en: 'Create a complete e-commerce store to sell your products', fr: 'Créez une boutique e-commerce complète pour vendre vos produits', es: 'Crea una tienda e-commerce completa para vender tus productos', tr: 'Ürünlerinizi satmak için eksiksiz bir e-ticaret mağazası oluşturun' },
        price: 'من $499.99',
        delivery: '7-14 يوم',
        features: { ar: ['نظام دفع آمن', 'إدارة المخزون', 'تقارير مبيعات', 'دعم فني مستمر'], en: ['Secure Payment System', 'Inventory Management', 'Sales Reports', 'Ongoing Technical Support'], fr: ['Système de Paiement Sécurisé', 'Gestion Inventaire', 'Rapports Ventes', 'Support Technique Continu'], es: ['Sistema de Pago Seguro', 'Gestión de Inventario', 'Informes de Ventas', 'Soporte Técnico Continuo'], tr: ['Güvenli Ödeme Sistemi', 'Envanter Yönetimi', 'Satış Raporları', 'Sürekli Teknik Destek'] }
      },
      {
        id: 'company-website',
        name: { ar: 'موقع شركة', en: 'Company Website', fr: 'Site Web d\'Entreprise', es: 'Sitio Web de Empresa', tr: 'Şirket Web Sitesi' },
        description: { ar: 'موقع إلكتروني احترافي لشركتك أو مؤسستك', en: 'Professional website for your company or organization', fr: 'Site web professionnel pour votre entreprise ou organisation', es: 'Sitio web profesional para tu empresa u organización', tr: 'Şirketiniz veya kuruluşunuz için profesyonel web sitesi' },
        price: 'من $199.99',
        delivery: '3-7 أيام',
        features: { ar: ['تصميم احترافي', 'صفحات متعددة', 'نموذج تواصل', 'تحسين محركات البحث'], en: ['Professional Design', 'Multiple Pages', 'Contact Form', 'SEO Optimization'], fr: ['Design Professionnel', 'Pages Multiples', 'Formulaire Contact', 'Optimisation SEO'], es: ['Diseño Profesional', 'Páginas Múltiples', 'Formulario de Contacto', 'Optimización SEO'], tr: ['Profesyonel Tasarım', 'Çoklu Sayfalar', 'İletişim Formu', 'SEO Optimizasyonu'] }
      },
      {
        id: 'personal-blog',
        name: { ar: 'مدونة شخصية', en: 'Personal Blog', fr: 'Blog Personnel', es: 'Blog Personal', tr: 'Kişisel Blog' },
        description: { ar: 'مدونة شخصية لمشاركة أفكارك ومحتواك', en: 'Personal blog to share your thoughts and content', fr: 'Blog personnel pour partager vos pensées et contenu', es: 'Blog personal para compartir tus pensamientos y contenido', tr: 'Düşüncelerinizi ve içeriğinizi paylaşmak için kişisel blog' },
        price: 'من $99.99',
        delivery: '2-5 أيام',
        features: { ar: ['نظام إدارة المحتوى', 'تصميم بسيط وأنيق', 'تحسين السرعة', 'دعم التعليقات'], en: ['Content Management System', 'Simple and Elegant Design', 'Speed Optimization', 'Comments Support'], fr: ['Système Gestion Contenu', 'Design Simple et Élégant', 'Optimisation Vitesse', 'Support Commentaires'], es: ['Sistema de Gestión de Contenido', 'Diseño Simple y Elegante', 'Optimización de Velocidad', 'Soporte de Comentarios'], tr: ['İçerik Yönetim Sistemi', 'Basit ve Zarif Tasarım', 'Hız Optimizasyonu', 'Yorum Desteği'] }
      }
    ]
  }
}

function AnimatedBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[2, 64, 64]} position={[0, 0, -3]}>
          <MeshDistortMaterial
            color="#06b6d4"
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

function ServiceCard({ service, language, categoryColor }) {
  const t = translations[language]
  
  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 overflow-hidden h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {service.popular && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            {t.popular}
          </Badge>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
            {service.name[language]}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{service.price}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>{service.delivery}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {service.description[language]}
        </p>
        
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm">{t.features}:</h4>
          <div className="space-y-2">
            {service.features[language].slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs text-gray-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          className={`w-full bg-gradient-to-r ${categoryColor} text-white hover:opacity-90 transition-opacity mt-auto`}
        >
          {t.orderNow}
          <ShoppingCart className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

function CategorySection({ categoryKey, category, language }) {
  const t = translations[language]
  const Icon = category.icon
  
  return (
    <div className="mb-16">
      {/* Category Header */}
      <div className="flex items-center justify-center mb-8">
        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
          {category.iconSrc ? (
            <img src={category.iconSrc} alt={t.categories[categoryKey]} className="w-10 h-10 object-contain filter brightness-0 invert" />
          ) : (
            <Icon className="w-8 h-8 text-white" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-white">
          <span className={`bg-gradient-to-r ${category.color.replace('from-', 'from-').replace('to-', 'to-')} bg-clip-text text-transparent`}>
            {t.categories[categoryKey]}
          </span>
        </h2>
      </div>
      
      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            language={language}
            categoryColor={category.color}
          />
        ))}
      </div>
    </div>
  )
}

export default function OtherServicesPage({ language }) {
  const t = translations[language]
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-20">
        <AnimatedBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Category Sections */}
        {Object.entries(serviceCategories).map(([categoryKey, category]) => (
          <CategorySection
            key={categoryKey}
            categoryKey={categoryKey}
            category={category}
            language={language}
          />
        ))}

        {/* Custom Services */}
        <div className="text-center mt-16">
          <Card className="bg-black/40 backdrop-blur-md border-white/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'ar' ? 'خدمات مخصصة' :
               language === 'en' ? 'Custom Services' :
               language === 'fr' ? 'Services Personnalisés' :
               language === 'es' ? 'Servicios Personalizados' :
               'Özel Hizmetler'}
            </h3>
            <p className="text-gray-400 mb-6">
              {language === 'ar' ? 'لديك طلب خاص؟ تواصل معنا وسنوفر لك الحل المناسب' :
               language === 'en' ? 'Have a special request? Contact us and we\'ll provide the right solution' :
               language === 'fr' ? 'Vous avez une demande spéciale? Contactez-nous et nous fournirons la bonne solution' :
               language === 'es' ? '¿Tienes una solicitud especial? Contáctanos y te proporcionaremos la solución adecuada' :
               'Özel bir isteğiniz mi var? Bizimle iletişime geçin, size doğru çözümü sağlayalım'}
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              {language === 'ar' ? 'تواصل معنا' :
               language === 'en' ? 'Contact Us' :
               language === 'fr' ? 'Nous Contacter' :
               language === 'es' ? 'Contáctanos' :
               'Bize Ulaşın'}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

