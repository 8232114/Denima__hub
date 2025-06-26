import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Plus, ShoppingCart, Package, ArrowRight, Store, TrendingUp } from 'lucide-react';

const MarketplaceDashboard = ({ user, token }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    myProducts: 0,
    recentProducts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // يمكن إضافة API calls هنا لجلب الإحصائيات
      setStats({
        totalProducts: 150,
        myProducts: 5,
        recentProducts: 12
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/marketplace/add-product');
  };

  const handleBrowseProducts = () => {
    navigate('/marketplace/browse');
  };

  const handleMyProducts = () => {
    navigate('/marketplace/my-products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Store className="w-8 h-8 text-purple-600" />
                  السوق
                </h1>
                <p className="mt-2 text-gray-600">
                  مرحبًا بك {user?.username}، اختر ما تريد فعله في السوق
                </p>
              </div>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">في السوق</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">منتجاتي</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.myProducts}</div>
              <p className="text-xs text-muted-foreground">منتج مضاف</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">منتجات جديدة</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentProducts}</div>
              <p className="text-xs text-muted-foreground">هذا الأسبوع</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Product Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={handleAddProduct}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">إضافة منتج</CardTitle>
              <CardDescription>
                أضف منتجًا جديدًا للبيع في السوق
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                قم بإضافة منتجك مع الصور والوصف والسعر، وسيتمكن المشترون من التواصل معك مباشرة
              </p>
              <Button className="w-full group-hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4 ml-2" />
                إضافة منتج جديد
              </Button>
            </CardContent>
          </Card>

          {/* Browse Products Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={handleBrowseProducts}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">تسوق</CardTitle>
              <CardDescription>
                تصفح المنتجات المتاحة في السوق
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                اكتشف مجموعة متنوعة من المنتجات وتواصل مع البائعين مباشرة عبر واتساب
              </p>
              <Button variant="outline" className="w-full group-hover:bg-blue-50 transition-colors">
                <ShoppingCart className="w-4 h-4 ml-2" />
                تصفح المنتجات
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Products Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>منتجاتي</CardTitle>
                  <CardDescription>إدارة المنتجات التي أضفتها</CardDescription>
                </div>
                <Button variant="outline" onClick={handleMyProducts}>
                  عرض الكل
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لم تقم بإضافة أي منتجات بعد</p>
                <Button className="mt-4" onClick={handleAddProduct}>
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة منتج الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>نصائح للبيع الناجح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">صور واضحة</h4>
                    <p className="text-sm text-gray-600">أضف صورًا واضحة وجذابة لمنتجك</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">وصف مفصل</h4>
                    <p className="text-sm text-gray-600">اكتب وصفًا مفصلاً وصادقًا للمنتج</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">سعر مناسب</h4>
                    <p className="text-sm text-gray-600">حدد سعرًا مناسبًا وتنافسيًا</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">رد سريع</h4>
                    <p className="text-sm text-gray-600">رد على استفسارات المشترين بسرعة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDashboard;

