import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Plus, Edit, Trash2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import personalWebsiteIcon from "../assets/icons/personal_website_icon.png";
import businessWebsiteIcon from "../assets/icons/business_website_icon.png";
import fullWebsiteIcon from "../assets/icons/full_website_icon.png";

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
      case 'Monitor':
      case 'FullWebsite': return <img src={fullWebsiteIcon} alt="Full Website" className="w-8 h-8" />;
      case 'PersonalWebsite':
      case 'Portfolio': return <img src={personalWebsiteIcon} alt="Personal Website" className="w-8 h-8" />;
      case 'BusinessWebsite':
      case 'ECommerce': return <img src={businessWebsiteIcon} alt="Business Website" className="w-8 h-8" />;
      case 'Headphones': return '🎧';
      case 'Gamepad2': return '🎮';
      case 'Blog': return '📝';
      case 'Corporate': return '🏢';
      case 'Restaurant': return '🍽️';
      case 'Medical': return '🏥';
      case 'Education': return '🎓';
      case 'RealEstate': return '🏠';
      case 'Fashion': return '👗';
      case 'Technology': return '💻';
      case 'Travel': return '✈️';
      case 'Fitness': return '💪';
      case 'Photography': return '📸';
      case 'Music': return '🎵';
      case 'News': return '📰';
      case 'Sports': return '⚽';
      case 'Food': return '🍕';
      case 'Beauty': return '💄';
      case 'Automotive': return '🚗';
      case 'Finance': return '💰';
      case 'Legal': return '⚖️';
      case 'Consulting': return '📊';
      case 'NonProfit': return '🤝';
      case 'Event': return '🎉';
      case 'Wedding': return '💒';
      case 'Pet': return '🐾';
      case 'Gaming': return '🎯';
      case 'Art': return '🎨';
      case 'Craft': return '🛠️';
      case 'Agriculture': return '🌾';
      case 'Construction': return '🏗️';
      case 'Logistics': return '🚚';
      case 'Security': return '🔒';
      case 'Insurance': return '🛡️';
      case 'Pharmacy': return '💊';
      case 'Dental': return '🦷';
      case 'Veterinary': return '🐕‍🦺';
      case 'Cleaning': return '🧽';
      case 'Repair': return '🔧';
      case 'Delivery': return '🚴‍♂️';
      case 'Taxi': return '🚕';
      case 'Hotel': return '🏨';
      case 'Spa': return '🧘‍♀️';
      case 'Salon': return '💇‍♀️';
      case 'Gym': return '🏋️‍♂️';
      case 'Yoga': return '🧘';
      case 'Dance': return '💃';
      case 'Theater': return '🎭';
      case 'Cinema': return '🎬';
      case 'Library': return '📚';
      case 'Museum': return '🏛️';
      case 'Gallery': return '🖼️';
      case 'Church': return '⛪';
      case 'Mosque': return '🕌';
      case 'Charity': return '❤️';
      case 'Environment': return '🌱';
      case 'Energy': return '⚡';
      case 'Mining': return '⛏️';
      case 'Factory': return '🏭';
      case 'Laboratory': return '🔬';
      case 'Research': return '🔍';
      case 'Innovation': return '💡';
      case 'Startup': return '🚀';
      case 'Investment': return '📈';
      case 'Banking': return '🏦';
      case 'Accounting': return '🧮';
      case 'Marketing': return '📢';
      case 'Advertising': return '📺';
      case 'Design': return '🎨';
      case 'Development': return '👨‍💻';
      case 'Support': return '🎧';
      case 'Training': return '📖';
      case 'Coaching': return '🏆';
      case 'Mentoring': return '👨‍🏫';
      case 'Freelance': return '💻';
      case 'Remote': return '🌍';
      case 'Coworking': return '🏢';
      case 'Office': return '🏢';
      case 'Warehouse': return '🏭';
      case 'Retail': return '🏪';
      case 'Wholesale': return '📦';
      case 'Import': return '🚢';
      case 'Export': return '✈️';
      case 'Customs': return '🛃';
      case 'Shipping': return '📦';
      case 'Packaging': return '📦';
      case 'Storage': return '🏪';
      case 'Distribution': return '🚚';
      case 'Supply': return '⛓️';
      case 'Manufacturing': return '🏭';
      case 'Production': return '⚙️';
      case 'Quality': return '✅';
      case 'Testing': return '🧪';
      case 'Certification': return '📜';
      case 'Standards': return '📏';
      case 'Compliance': return '✔️';
      case 'Audit': return '📋';
      case 'Risk': return '⚠️';
      case 'Safety': return '🦺';
      case 'Health': return '🏥';
      case 'Wellness': return '🌿';
      case 'Nutrition': return '🥗';
      case 'Diet': return '🍎';
      case 'Organic': return '🌱';
      case 'Vegan': return '🥬';
      case 'Vegetarian': return '🥕';
      case 'Gluten': return '🌾';
      case 'Keto': return '🥑';
      case 'Paleo': return '🥩';
      case 'Mediterranean': return '🫒';
      case 'Asian': return '🍜';
      case 'Italian': return '🍝';
      case 'Mexican': return '🌮';
      case 'Indian': return '🍛';
      case 'Chinese': return '🥢';
      case 'Japanese': return '🍣';
      case 'Korean': return '🍲';
      case 'Thai': return '🍤';
      case 'Vietnamese': return '🍜';
      case 'French': return '🥖';
      case 'German': return '🍺';
      case 'Spanish': return '🥘';
      case 'Greek': return '🫒';
      case 'Turkish': return '🥙';
      case 'Lebanese': return '🧆';
      case 'Moroccan': return '🍲';
      case 'Egyptian': return '🧆';
      case 'Saudi': return '🍖';
      case 'Emirati': return '🍖';
      case 'Kuwaiti': return '🍖';
      case 'Qatari': return '🍖';
      case 'Bahraini': return '🍖';
      case 'Omani': return '🍖';
      case 'Yemeni': return '🍖';
      case 'Jordanian': return '🧆';
      case 'Palestinian': return '🧆';
      case 'Syrian': return '🧆';
      case 'Iraqi': return '🧆';
      case 'Iranian': return '🍖';
      case 'Afghan': return '🍖';
      case 'Pakistani': return '🍛';
      case 'Bangladeshi': return '🍛';
      case 'Sri Lankan': return '🍛';
      case 'Nepalese': return '🍛';
      case 'Bhutanese': return '🍛';
      case 'Maldivian': return '🐟';
      case 'Indonesian': return '🍜';
      case 'Malaysian': return '🍜';
      case 'Singaporean': return '🍜';
      case 'Brunei': return '🍜';
      case 'Filipino': return '🍜';
      case 'Cambodian': return '🍜';
      case 'Laotian': return '🍜';
      case 'Burmese': return '🍜';
      case 'Mongolian': return '🍖';
      case 'Tibetan': return '🍖';
      case 'Kazakh': return '🍖';
      case 'Kyrgyz': return '🍖';
      case 'Tajik': return '🍖';
      case 'Turkmen': return '🍖';
      case 'Uzbek': return '🍖';
      case 'Russian': return '🍖';
      case 'Ukrainian': return '🍖
      case 'Belarusian': return '🍖';
      case 'Polish': return '🍖';
      case 'Czech': return '🍺';
      case 'Slovak': return '🍺';
      case 'Hungarian': return '🍖';
      case 'Romanian': return '🍖';
      case 'Bulgarian': return '🍖';
      case 'Serbian': return '🍖';
      case 'Croatian': return '🍖';
      case 'Bosnian': return '🍖';
      case 'Montenegrin': return '🍖';
      case 'Macedonian': return '🍖';
      case 'Albanian': return '🍖';
      case 'Slovenian': return '🍖';
      case 'Estonian': return '🍖';
      case 'Latvian': return '🍖';
      case 'Lithuanian': return '🍖';
      case 'Finnish': return '🐟';
      case 'Swedish': return '🐟';
      case 'Norwegian': return '🐟';
      case 'Danish': return '🐟';
      case 'Icelandic': return '🐟';
      case 'Dutch': return '🧀';
      case 'Belgian': return '🍟';
      case 'Luxembourg': return '🍷';
      case 'Swiss': return '🧀';
      case 'Austrian': return '🥨';
      case 'Liechtenstein': return '🧀';
      case 'Monaco': return '🍷';
      case 'Andorra': return '🍷';
      case 'San Marino': return '🍝';
      case 'Vatican': return '🍝';
      case 'Malta': return '🐟';
      case 'Cyprus': return '🫒';
      case 'Portuguese': return '🐟';
      case 'British': return '☕';
      case 'Irish': return '🍺';
      case 'Faroese': return '🐟';
      case 'Greenlandic': return '🐟';
      case 'Canadian': return '🍁';
      case 'American': return '🍔';
      case 'Mexican': return '🌮';
      case 'Guatemalan': return '🌮';
      case 'Belizean': return '🌮';
      case 'Salvadoran': return '🌮';
      case 'Honduran': return '🌮';
      case 'Nicaraguan': return '🌮';
      case 'Costa Rican': return '🌮';
      case 'Panamanian': return '🌮';
      case 'Cuban': return '🍹';
      case 'Jamaican': return '🍹';
      case 'Haitian': return '🍹';
      case 'Dominican': return '🍹';
      case 'Puerto Rican': return '🍹';
      case 'Trinidadian': return '🍹';
      case 'Barbadian': return '🍹';
      case 'Bahamian': return '🍹';
      case 'Colombian': return '☕';
      case 'Venezuelan': return '🍖';
      case 'Guyanese': return '🍖';
      case 'Surinamese': return '🍖';
      case 'French Guianese': return '🍖';
      case 'Brazilian': return '🍖';
      case 'Uruguayan': return '🍖';
      case 'Argentinian': return '🍖';
      case 'Chilean': return '🍷';
      case 'Bolivian': return '🍖';
      case 'Paraguayan': return '🍖';
      case 'Peruvian': return '🍖';
      case 'Ecuadorian': return '🍖';
      default: return '📱';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'streaming': return 'from-red-500 to-pink-500';
      case 'music': return 'from-green-500 to-teal-500';
      case 'gaming': return 'from-blue-500 to-purple-500';
      case 'personal': return 'from-indigo-500 to-blue-500';
      case 'business': return 'from-orange-500 to-red-500';
      case 'ecommerce': return 'from-green-600 to-emerald-500';
      case 'portfolio': return 'from-purple-600 to-pink-500';
      case 'blog': return 'from-yellow-500 to-orange-500';
      case 'corporate': return 'from-gray-600 to-gray-800';
      case 'restaurant': return 'from-red-600 to-orange-600';
      case 'medical': return 'from-blue-600 to-cyan-500';
      case 'education': return 'from-indigo-600 to-purple-600';
      case 'realestate': return 'from-green-700 to-teal-600';
      case 'fashion': return 'from-pink-500 to-rose-500';
      case 'technology': return 'from-blue-500 to-indigo-500';
      case 'travel': return 'from-sky-500 to-blue-500';
      case 'fitness': return 'from-red-500 to-orange-500';
      case 'photography': return 'from-gray-500 to-slate-600';
      case 'news': return 'from-slate-600 to-gray-700';
      case 'sports': return 'from-green-500 to-lime-500';
      case 'food': return 'from-orange-500 to-yellow-500';
      case 'beauty': return 'from-pink-400 to-rose-400';
      case 'automotive': return 'from-slate-700 to-gray-800';
      case 'finance': return 'from-emerald-600 to-green-600';
      case 'legal': return 'from-blue-800 to-indigo-800';
      case 'consulting': return 'from-teal-600 to-cyan-600';
      case 'nonprofit': return 'from-red-400 to-pink-400';
      case 'event': return 'from-purple-400 to-pink-400';
      case 'wedding': return 'from-rose-400 to-pink-400';
      case 'pet': return 'from-amber-500 to-orange-500';
      case 'art': return 'from-violet-500 to-purple-500';
      case 'craft': return 'from-amber-600 to-yellow-600';
      case 'agriculture': return 'from-green-600 to-lime-600';
      case 'construction': return 'from-orange-600 to-red-600';
      case 'logistics': return 'from-blue-600 to-indigo-600';
      case 'security': return 'from-red-700 to-red-800';
      case 'insurance': return 'from-blue-700 to-indigo-700';
      case 'pharmacy': return 'from-green-500 to-teal-500';
      case 'dental': return 'from-blue-400 to-cyan-400';
      case 'veterinary': return 'from-green-400 to-emerald-400';
      case 'cleaning': return 'from-blue-300 to-sky-300';
      case 'repair': return 'from-gray-600 to-slate-600';
      case 'delivery': return 'from-yellow-500 to-amber-500';
      case 'taxi': return 'from-yellow-400 to-orange-400';
      case 'hotel': return 'from-blue-500 to-purple-500';
      case 'spa': return 'from-green-300 to-emerald-300';
      case 'salon': return 'from-pink-300 to-rose-300';
      case 'gym': return 'from-red-400 to-orange-400';
      case 'yoga': return 'from-green-300 to-teal-300';
      case 'dance': return 'from-pink-400 to-purple-400';
      case 'theater': return 'from-purple-600 to-indigo-600';
      case 'cinema': return 'from-red-600 to-pink-600';
      case 'library': return 'from-blue-600 to-cyan-600';
      case 'museum': return 'from-amber-600 to-orange-600';
      case 'gallery': return 'from-purple-500 to-pink-500';
      case 'church': return 'from-blue-700 to-indigo-700';
      case 'mosque': return 'from-green-700 to-teal-700';
      case 'charity': return 'from-red-400 to-pink-400';
      case 'environment': return 'from-green-500 to-emerald-500';
      case 'energy': return 'from-yellow-400 to-orange-400';
      case 'mining': return 'from-gray-700 to-slate-700';
      case 'factory': return 'from-gray-600 to-slate-600';
      case 'laboratory': return 'from-blue-500 to-cyan-500';
      case 'research': return 'from-indigo-500 to-blue-500';
      case 'innovation': return 'from-yellow-400 to-amber-400';
      case 'startup': return 'from-purple-500 to-pink-500';
      case 'investment': return 'from-green-600 to-emerald-600';
      case 'banking': return 'from-blue-800 to-indigo-800';
      case 'accounting': return 'from-green-700 to-teal-700';
      case 'marketing': return 'from-orange-500 to-red-500';
      case 'advertising': return 'from-purple-500 to-pink-500';
      case 'design': return 'from-pink-500 to-rose-500';
      case 'development': return 'from-blue-500 to-indigo-500';
      case 'support': return 'from-green-500 to-teal-500';
      case 'training': return 'from-blue-600 to-purple-600';
      case 'coaching': return 'from-yellow-500 to-orange-500';
      case 'mentoring': return 'from-indigo-500 to-purple-500';
      case 'freelance': return 'from-teal-500 to-cyan-500';
      case 'remote': return 'from-blue-400 to-sky-400';
      case 'coworking': return 'from-purple-400 to-pink-400';
      case 'office': return 'from-gray-500 to-slate-500';
      case 'warehouse': return 'from-gray-600 to-slate-600';
      case 'retail': return 'from-orange-500 to-red-500';
      case 'wholesale': return 'from-blue-600 to-indigo-600';
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
                    <ShoppingBag className="w-5 h-5" />
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
              <select id="icon" name="icon" value={productForm.icon} onChange={handleProductFormChange} className="col-span-3 p-2 border rounded-md">
                <option value="">اختر أيقونة</option>
                <option value="Monitor">📺 Monitor</option>
                <option value="Headphones">🎧 Headphones</option>
                <option value="Gamepad2">🎮 Gamepad2</option>
                <option value="PersonalWebsite">👨‍💼 موقع شخصي احترافي</option>
                <option value="BusinessWebsite">🏪 موقع تجاري</option>
                <option value="FullWebsite">🌐 موقع إلكتروني كامل</option>
                <option value="ECommerce">🛒 متجر إلكتروني</option>
                <option value="Portfolio">💼 معرض أعمال</option>
                <option value="Blog">📝 مدونة</option>
                <option value="Corporate">🏢 موقع شركة</option>
                <option value="Restaurant">🍽️ مطعم</option>
                <option value="Medical">🏥 طبي</option>
                <option value="Education">🎓 تعليمي</option>
                <option value="RealEstate">🏠 عقارات</option>
                <option value="Fashion">👗 أزياء</option>
                <option value="Technology">💻 تقنية</option>
                <option value="Travel">✈️ سفر</option>
                <option value="Fitness">💪 لياقة بدنية</option>
                <option value="Photography">📸 تصوير</option>
                <option value="Music">🎵 موسيقى</option>
                <option value="News">📰 أخبار</option>
                <option value="Sports">⚽ رياضة</option>
                <option value="Food">🍕 طعام</option>
                <option value="Beauty">💄 جمال</option>
                <option value="Automotive">🚗 سيارات</option>
                <option value="Finance">💰 مالية</option>
                <option value="Legal">⚖️ قانونية</option>
                <option value="Consulting">📊 استشارات</option>
                <option value="NonProfit">🤝 منظمات غير ربحية</option>
                <option value="Event">🎉 فعاليات</option>
                <option value="Wedding">💒 أفراح</option>
                <option value="Pet">🐾 حيوانات أليفة</option>
                <option value="Gaming">🎯 ألعاب</option>
                <option value="Art">🎨 فن</option>
                <option value="Craft">🛠️ حرف يدوية</option>
              </select>
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


