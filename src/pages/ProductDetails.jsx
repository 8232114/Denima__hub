import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ArrowRight, MessageCircle, Phone, User, Calendar, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://denima-api-backend-production.up.railway.app/api' : 'http://localhost:5000/api';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data.product);
      } else {
        setError(data.message || 'فشل في جلب تفاصيل المنتج');
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPurchase = () => {
    if (!product) return;
    
    const message = `مرحباً، أريد شراء هذا المنتج: ${product.name} - ${product.price} درهم`;
    const whatsappUrl = `https://wa.me/${product.seller_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMediator = () => {
    if (!product) return;
    
    const productUrl = `${window.location.origin}/marketplace/product/${product.id}`;
    const message = `مرحباً، أريدك أن تتوسط لي مع صاحب هذا المنتج: ${productUrl}`;
    const whatsappUrl = `https://wa.me/0633785269?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">خطأ</h2>
          <p className="text-gray-600 mb-6">{error || 'المنتج غير موجود'}</p>
          <Button onClick={() => navigate('/marketplace/browse')}>
            العودة للتسوق
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="mt-2 text-gray-600">
                  تفاصيل المنتج
                </p>
              </div>
              <Button
                onClick={() => navigate('/marketplace/browse')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للتسوق
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              <>
                {/* Main Image */}
                <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={`${API_BASE_URL}${product.images[currentImageIndex].image_url}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex 
                            ? 'border-purple-600' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={`${API_BASE_URL}${image.image_url}`}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <Eye className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Price and Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>البائع: {product.seller_username}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>تاريخ الإضافة: {formatDate(product.created_at)}</span>
                    </div>
                  </div>
                  <Badge className="bg-purple-600 text-lg px-4 py-2">
                    {product.price} درهم
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>وصف المنتج</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Additional Details */}
            {product.additional_details && (
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل إضافية</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {product.additional_details}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle>خيارات الشراء</CardTitle>
                <CardDescription>
                  اختر طريقة التواصل المفضلة لديك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleDirectPurchase}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  شراء مباشرة عبر واتساب
                </Button>
                
                <Button
                  onClick={handleMediator}
                  variant="outline"
                  className="w-full text-lg py-6"
                >
                  <Phone className="w-5 h-5 ml-2" />
                  التواصل عبر الواسط
                </Button>
                
                <div className="text-sm text-gray-500 text-center pt-2">
                  <p>• الشراء المباشر: تواصل مع البائع مباشرة</p>
                  <p>• الواسط: نتوسط لك مع البائع لضمان حقوقك</p>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">نصائح للشراء الآمن</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-yellow-700 space-y-2">
                <p>• تأكد من تفاصيل المنتج قبل الشراء</p>
                <p>• اطلب صورًا إضافية إذا لزم الأمر</p>
                <p>• استخدم خدمة الواسط للحماية الإضافية</p>
                <p>• لا تدفع مقدمًا إلا بعد التأكد من المنتج</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

