import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { ArrowRight, Plus, Edit, Trash2, Eye, Package, Calendar } from 'lucide-react';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://web-production-e7d36.up.railway.app/api' : 'http://localhost:5000/api';

const MyProducts = ({ user, token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/my-products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
      } else {
        setError(data.message || 'فشل في جلب منتجاتك');
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteDialog.product) return;

    try {
      setDeleting(true);
      const response = await fetch(`${API_BASE_URL}/products/${deleteDialog.product.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== deleteDialog.product.id));
        setDeleteDialog({ open: false, product: null });
      } else {
        const data = await response.json();
        setError(data.message || 'فشل في حذف المنتج');
      }
    } catch (error) {
      setError('حدث خطأ أثناء حذف المنتج');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ProductCard = ({ product }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        {product.images && product.images.length > 0 ? (
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={`${API_BASE_URL}${product.images[0].image_url}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge 
              className={`absolute top-2 right-2 ${
                product.is_active ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              {product.is_active ? 'نشط' : 'غير نشط'}
            </Badge>
            <Badge className="absolute top-2 left-2 bg-purple-600">
              {product.price} درهم
            </Badge>
          </div>
        ) : (
          <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center relative">
            <Package className="w-12 h-12 text-gray-400" />
            <Badge 
              className={`absolute top-2 right-2 ${
                product.is_active ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              {product.is_active ? 'نشط' : 'غير نشط'}
            </Badge>
            <Badge className="absolute top-2 left-2 bg-purple-600">
              {product.price} درهم
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </CardDescription>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          <span>أضيف في {formatDate(product.created_at)}</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/marketplace/product/${product.id}`)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 ml-2" />
            عرض
          </Button>
          <Button
            onClick={() => navigate(`/marketplace/edit-product/${product.id}`)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Edit className="w-4 h-4 ml-2" />
            تعديل
          </Button>
          <Button
            onClick={() => setDeleteDialog({ open: true, product })}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Package className="w-8 h-8 text-purple-600" />
                  منتجاتي
                </h1>
                <p className="mt-2 text-gray-600">
                  إدارة المنتجات التي أضفتها ({products.length} منتج)
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate('/marketplace/add-product')}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة منتج
                </Button>
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري تحميل منتجاتك...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات بعد</p>
            <Button
              onClick={() => navigate('/marketplace/add-product')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              إضافة منتج الآن
            </Button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المنتجات النشطة</CardTitle>
                  <Package className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {products.filter(p => p.is_active).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المنتجات غير النشطة</CardTitle>
                  <Package className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">
                    {products.filter(p => !p.is_active).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, product: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف المنتج "{deleteDialog.product?.name}"؟ 
              هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, product: null })}
              disabled={deleting}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={deleting}
            >
              {deleting ? 'جاري الحذف...' : 'حذف'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProducts;

