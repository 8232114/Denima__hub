import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';

const DigitalProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://web-production-e7d36.up.railway.app/api' 
    : 'http://localhost:5000/api';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/digital-products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        setError('فشل في تحميل المنتجات');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      // Use fallback data if API fails
      setProducts([
        {
          id: 1,
          name: 'Netflix Premium',
          description: 'حساب Netflix مميز لمدة شهر كامل مع إمكانية المشاهدة بجودة 4K',
          price: '$15',
          original_price: '$25',
          category: 'streaming',
          icon: 'Monitor',
          features: ['جودة 4K', 'مشاهدة على 4 أجهزة', 'محتوى حصري', 'بدون إعلانات'],
          rating: 4.9
        },
        {
          id: 2,
          name: 'Spotify Premium',
          description: 'استمتع بالموسيقى بدون إعلانات مع جودة عالية',
          price: '$12',
          original_price: '$20',
          category: 'music',
          icon: 'Headphones',
          features: ['بدون إعلانات', 'جودة عالية', 'تحميل للاستماع بدون إنترنت', 'قوائم تشغيل مخصصة'],
          rating: 4.8
        },
        {
          id: 3,
          name: 'PlayStation Plus',
          description: 'اشتراك PlayStation Plus مع ألعاب مجانية شهرية',
          price: '$20',
          original_price: '$30',
          category: 'gaming',
          icon: 'Gamepad2',
          features: ['ألعاب مجانية شهرية', 'خصومات حصرية', 'لعب أونلاين', 'تخزين سحابي'],
          rating: 4.7
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = (product) => {
    const message = `مرحبًا 👋\nأود طلب المنتج التالي:\n\n📦 ${product.name}\n💰 السعر: ${product.price}\n\nشكرًا لك 🙏`;
    const whatsappUrl = `https://wa.me/212633785269?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Monitor':
        return '📺';
      case 'Headphones':
        return '🎧';
      case 'Gamepad2':
        return '🎮';
      default:
        return '📱';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'streaming':
        return 'from-red-500 to-pink-500';
      case 'music':
        return 'from-green-500 to-teal-500';
      case 'gaming':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-purple-500 to-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للرئيسية
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">المنتجات الرقمية</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            المنتجات الرقمية المميزة
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من الحسابات المميزة والمنتجات الرقمية بأسعار تنافسية
          </p>
        </div>

        {/* Products Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Product Header */}
                <div className={`bg-gradient-to-r ${getCategoryColor(product.category)} p-6 text-center`}>
                  <div className="text-6xl mb-4">{getIconComponent(product.icon)}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-white/90">{product.description}</p>
                </div>

                {/* Product Body */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-lg font-semibold text-gray-700 ml-2">({product.rating})</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    {product.original_price && (
                      <span className="text-gray-400 line-through text-lg ml-2">
                        {product.original_price}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-purple-600">{product.price}</span>
                    {product.original_price && (
                      <div className="inline-block bg-red-500 text-white text-sm px-2 py-1 rounded-full mr-2">
                        وفر ${parseInt(product.original_price.replace('$', '')) - parseInt(product.price.replace('$', ''))}
                      </div>
                    )}
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className={`w-full bg-gradient-to-r ${getCategoryColor(product.category)} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    اطلب الآن عبر واتساب
                    <span className="bg-white/20 text-sm px-2 py-1 rounded-full mr-2">
                      {products.findIndex(p => p.id === product.id) + 1}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            هل تبحث عن منتج معين؟
          </h2>
          <p className="text-gray-600 mb-6">
            تواصل معنا وسنساعدك في العثور على ما تحتاجه
          </p>
          <button
            onClick={() => {
              const message = 'مرحبًا 👋\nأبحث عن منتج معين، هل يمكنكم مساعدتي؟';
              const whatsappUrl = `https://wa.me/212633785269?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all"
          >
            تواصل معنا
          </button>
        </div>
      </main>
    </div>
  );
};

export default DigitalProducts;

