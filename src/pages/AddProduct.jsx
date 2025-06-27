import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { ArrowRight, Upload, X, Image as ImageIcon, DollarSign, Package, Phone } from 'lucide-react';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://denima-api-backend-production.up.railway.app/api' : 'http://localhost:5000/api';

const AddProduct = ({ user, token }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    additional_details: '',
    seller_phone: ''
  });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + selectedImages.length > 5) {
      setError('يمكنك رفع 5 صور كحد أقصى');
      return;
    }

    // التحقق من حجم الملفات
    const maxSize = 10 * 1024 * 1024; // 10MB
    const invalidFiles = files.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      setError(`بعض الملفات كبيرة جداً. الحد الأقصى 10MB لكل صورة`);
      return;
    }

    // التحقق من نوع الملفات
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
    const invalidTypes = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidTypes.length > 0) {
      setError('نوع ملف غير مدعوم. يُسمح فقط بـ PNG, JPG, JPEG, GIF, WEBP');
      return;
    }

    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // إنشاء معاينات للصور
    const newPreviews = [...imagePreviews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          file,
          preview: e.target.result
        });
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
    
    // مسح رسالة الخطأ إذا كانت موجودة
    setError('');
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // إنشاء المنتج أولاً
      const productResponse = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });

      const productData = await productResponse.json();

      if (!productResponse.ok) {
        throw new Error(productData.message || 'فشل في إضافة المنتج');
      }

      const productId = productData.product.id;

      // رفع الصور إذا كانت موجودة
      if (selectedImages.length > 0) {
        setUploadingImages(true);
        
        const uploadErrors = [];
        
        for (let i = 0; i < selectedImages.length; i++) {
          const image = selectedImages[i];
          const formData = new FormData();
          formData.append('image', image);

          try {
            const imageResponse = await fetch(`${API_BASE_URL}/products/${productId}/images`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: formData
            });

            const imageData = await imageResponse.json();

            if (!imageResponse.ok) {
              uploadErrors.push(`الصورة ${i + 1}: ${imageData.message || 'فشل في الرفع'}`);
            }
          } catch (error) {
            uploadErrors.push(`الصورة ${i + 1}: خطأ في الاتصال`);
          }
        }
        
        if (uploadErrors.length > 0) {
          setError(`تم إضافة المنتج ولكن فشل رفع بعض الصور:\n${uploadErrors.join('\n')}`);
        } else {
          setSuccess('تم إضافة المنتج وجميع الصور بنجاح!');
        }
      } else {
        setSuccess('تم إضافة المنتج بنجاح!');
      }
      
      // إعادة تعيين النموذج
      setProductForm({
        name: '',
        description: '',
        price: '',
        additional_details: '',
        seller_phone: ''
      });
      setSelectedImages([]);
      setImagePreviews([]);

      // التوجه إلى صفحة المنتجات بعد 2 ثانية
      setTimeout(() => {
        navigate('/marketplace/my-products');
      }, 2000);

    } catch (error) {
      setError(error.message || 'حدث خطأ أثناء إضافة المنتج');
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Package className="w-8 h-8 text-purple-600" />
                  إضافة منتج جديد
                </h1>
                <p className="mt-2 text-gray-600">
                  أضف منتجك للبيع في السوق
                </p>
              </div>
              <Button
                onClick={() => navigate('/marketplace')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للسوق
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>معلومات المنتج</CardTitle>
            <CardDescription>
              املأ جميع المعلومات المطلوبة لإضافة منتجك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اسم المنتج */}
              <div className="space-y-2">
                <Label htmlFor="name">اسم المنتج *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="أدخل اسم المنتج"
                  value={productForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* وصف المنتج */}
              <div className="space-y-2">
                <Label htmlFor="description">وصف المنتج *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="اكتب وصفًا مفصلاً للمنتج..."
                  value={productForm.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              {/* السعر */}
              <div className="space-y-2">
                <Label htmlFor="price">السعر (درهم) *</Label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={productForm.price}
                    onChange={handleInputChange}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="seller_phone">رقم الهاتف للتواصل *</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="seller_phone"
                    name="seller_phone"
                    type="tel"
                    placeholder="0633785269"
                    value={productForm.seller_phone}
                    onChange={handleInputChange}
                    className="pr-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  سيتم استخدام هذا الرقم للتواصل معك عبر واتساب
                </p>
              </div>

              {/* تفاصيل إضافية */}
              <div className="space-y-2">
                <Label htmlFor="additional_details">تفاصيل إضافية (اختياري)</Label>
                <Textarea
                  id="additional_details"
                  name="additional_details"
                  placeholder="أي معلومات إضافية عن المنتج..."
                  value={productForm.additional_details}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              {/* رفع الصور */}
              <div className="space-y-4">
                <Label>صور المنتج (اختياري - حتى 5 صور)</Label>
                
                {/* منطقة رفع الصور */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={selectedImages.length >= 5}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {selectedImages.length >= 5 
                        ? 'تم الوصول للحد الأقصى (5 صور)'
                        : 'انقر لاختيار الصور أو اسحبها هنا'
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      PNG, JPG, GIF حتى 10MB لكل صورة
                    </p>
                  </label>
                </div>

                {/* معاينة الصور */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview.preview}
                          alt={`معاينة ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading || uploadingImages}
                  className="flex-1"
                >
                  {loading ? (
                    uploadingImages ? 'جاري رفع الصور...' : 'جاري إضافة المنتج...'
                  ) : (
                    'إضافة المنتج'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/marketplace')}
                  disabled={loading}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;

