import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Plus, Edit, Trash2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const DigitalProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [showAddEditProduct, setShowAddEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: '',
    icon: '',
    features: [''],
    rating: 4.5,
  });

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://web-production-e7d36.up.railway.app/api' 
    : 'http://localhost:5000/api';

  useEffect(() => {
    fetchProducts();
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      console.log('Verifying token:', token ? 'Token exists' : 'No token');
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Token verification response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Token verification data:', data);
        setIsAdmin(data.user?.is_admin || false);
      } else {
        console.error('Token verification failed:', response.status);
        // Clear invalid token and force re-login
        localStorage.removeItem('admin_token');
        setToken(null);
        setIsAdmin(false);
        
        // Show alert to inform user they need to login again
        alert('انتهت صلاحية جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      // Clear token on error and force re-login
      localStorage.removeItem('admin_token');
      setToken(null);
      setIsAdmin(false);
      
      alert('خطأ في التحقق من صلاحية تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.');
    }
  };

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
      setProducts([]); // Fallback to empty array on error
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
      case 'Monitor': return '📺';
      case 'Headphones': return '🎧';
      case 'Gamepad2': return '🎮';
      default: return '📱';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'streaming': return 'from-red-500 to-pink-500';
      case 'music': return 'from-green-500 to-teal-500';
      case 'gaming': return 'from-blue-500 to-purple-500';
      default: return 'from-purple-500 to-blue-500';
    }
  };

  const handleAddProductClick = () => {
    setEditingProduct(null);
    setProductForm({
      name: '', description: '', price: '', original_price: '',
      category: '', icon: '', features: [''], rating: 4.5,
    });
    setShowAddEditProduct(true);
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name, description: product.description, price: product.price,
      original_price: product.original_price || '', category: product.category,
      icon: product.icon, features: product.features || [''], rating: product.rating,
    });
    setShowAddEditProduct(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        const response = await fetch(`${API_BASE_URL}/digital-products/${productId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          fetchProducts();
        } else {
          alert('فشل حذف المنتج');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('خطأ في الاتصال');
      }
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...productForm.features];
    newFeatures[index] = value;
    setProductForm(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () => {
    setProductForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureField = (index) => {
    const newFeatures = productForm.features.filter((_, i) => i !== index);
    setProductForm(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct 
      ? `${API_BASE_URL}/digital-products/${editingProduct.id}` 
      : `${API_BASE_URL}/digital-products`;

    try {
      console.log('Submitting product:', {
        method,
        url,
        token: token ? 'Token exists' : 'No token',
        data: {
          ...productForm,
          features: productForm.features.filter(f => f.trim() !== ''),
        }
      });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...productForm,
          features: productForm.features.filter(f => f.trim() !== ''),
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const successData = await response.json();
        console.log('Success response:', successData);
        alert(`تم ${editingProduct ? 'تحديث' : 'إضافة'} المنتج بنجاح!`);
        fetchProducts();
        setShowAddEditProduct(false);
      } else {
        // Get the full error response
        const responseText = await response.text();
        console.error('Error response text:', responseText);
        
        let errData;
        try {
          errData = JSON.parse(responseText);
        } catch (parseError) {
          errData = { message: responseText || 'خطأ غير معروف' };
        }
        
        console.error('Parsed error response:', errData);
        
        // Show detailed error message
        const errorMessage = errData.message || `خطأ ${response.status}: ${response.statusText}`;
        alert(`فشل ${editingProduct ? 'تحديث' : 'إضافة'} المنتج:\n\nالخطأ: ${errorMessage}\n\nكود الخطأ: ${response.status}\n\nالاستجابة الكاملة: ${responseText}`);
      }
    } catch (error) {
      console.error(`Error ${editingProduct ? 'updating' : 'adding'} product:`, error);
      alert(`خطأ في الاتصال: ${error.message}\n\nتفاصيل الخطأ: ${error.stack || 'غير متوفرة'}`);
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
              <h1 className="text-xl font-bold text-gray-800">تصميم المواقع</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            خدمات تصميم المواقع المميزة
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من خدمات تصميم المواقع الاحترافية بأسعار تنافسية
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              حالة المدير: {isAdmin ? 'مدير مسجل' : 'غير مسجل كمدير'} | 
              الرمز المميز: {token ? 'موجود' : 'غير موجود'}
            </p>
            {token && (
              <div className="mb-4">
                <Button 
                  onClick={() => {
                    localStorage.removeItem('admin_token');
                    setToken(null);
                    setIsAdmin(false);
                    alert('تم مسح الرمز المميز. يرجى تسجيل الدخول مرة أخرى.');
                  }}
                  variant="outline"
                  size="sm"
                  className="mb-2"
                >
                  مسح الرمز المميز وإعادة تسجيل الدخول
                </Button>
              </div>
            )}
            {isAdmin && (
              <Button onClick={handleAddProductClick} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="w-5 h-5 ml-2" /> إضافة منتج جديد
              </Button>
            )}
            {!isAdmin && token && (
              <p className="text-red-500 text-sm">لا تملك صلاحيات المدير</p>
            )}
            {!token && (
              <p className="text-yellow-500 text-sm">يجب تسجيل الدخول كمدير لإضافة المنتجات</p>
            )}
          </div>
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

                  {isAdmin && (
                    <div className="flex justify-center mt-4 space-x-2">
                      <Button onClick={() => handleEditProductClick(product)} variant="outline" size="sm">
                        <Edit className="w-4 h-4 ml-1" /> تعديل
                      </Button>
                      <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 ml-1" /> حذف
                      </Button>
                    </div>
                  )}
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

      {/* Add/Edit Product Dialog */}
      <Dialog open={showAddEditProduct} onOpenChange={setShowAddEditProduct}>
        <DialogContent className="sm:max-w-[425px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'تعديل المنتج الرقمي' : 'إضافة منتج رقمي جديد'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitProduct} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">الاسم</Label>
              <Input id="name" name="name" value={productForm.name} onChange={handleProductFormChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">الوصف</Label>
              <Textarea id="description" name="description" value={productForm.description} onChange={handleProductFormChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">السعر</Label>
              <Input id="price" name="price" value={productForm.price} onChange={handleProductFormChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="original_price" className="text-right">السعر الأصلي (اختياري)</Label>
              <Input id="original_price" name="original_price" value={productForm.original_price} onChange={handleProductFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">الفئة</Label>
              <Input id="category" name="category" value={productForm.category} onChange={handleProductFormChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">الأيقونة (Monitor, Headphones, Gamepad2)</Label>
              <Input id="icon" name="icon" value={productForm.icon} onChange={handleProductFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">التقييم (1-5)</Label>
              <Input id="rating" name="rating" type="number" step="0.1" min="1" max="5" value={productForm.rating} onChange={handleProductFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">الميزات</Label>
              <div className="col-span-3 space-y-2">
                {productForm.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="ميزة المنتج"
                    />
                    {productForm.features.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeFeatureField(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addFeatureField}>
                  <Plus className="h-4 w-4 ml-1" /> إضافة ميزة
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DigitalProducts;


