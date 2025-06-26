import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ArrowRight, Search, Filter, ShoppingCart, MessageCircle, User, Phone, Eye, Grid, List } from 'lucide-react';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://web-production-e7d36.up.railway.app/api' : 'http://localhost:5000/api';

const BrowseProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products?page=${currentPage}&per_page=12`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
        setTotalPages(data.pages);
      } else {
        setError(data.message || 'فشل في جلب المنتجات');
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (productId) => {
    navigate(`/marketplace/product/${productId}`);
  };

  const handleDirectPurchase = (product) => {
    const message = `مرحباً، أريد شراء هذا المنتج: ${product.name} - ${product.price} درهم`;
    const whatsappUrl = `https://wa.me/${product.seller_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMediator = (product) => {
    const productUrl = `${window.location.origin}/marketplace/product/${product.id}`;
    const message = `مرحباً، أريدك أن تتوسط لي مع صاحب هذا المنتج: ${productUrl}`;
    const whatsappUrl = `https://wa.me/0633785269?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const ProductCard = ({ product }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <div onClick={() => handleProductClick(product.id)}>
        <CardHeader className="p-0">
          {product.images && product.images.length > 0 ? (
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={`${API_BASE_URL}${product.images[0].image_url}`}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2 bg-purple-600">
                {product.price} درهم
              </Badge>
            </div>
          ) : (
            <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
              <Badge className="absolute top-2 right-2 bg-purple-600">
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
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <User className="w-4 h-4" />
            <span>{product.seller_username}</span>
          </div>
        </CardContent>
      </div>
      <div className="px-4 pb-4 space-y-2">
        <Button
          onClick={() => handleDirectPurchase(product)}
          className="w-full bg-green-600 hover:bg-green-700"
          size="sm"
        >
          <MessageCircle className="w-4 h-4 ml-2" />
          شراء مباشرة
        </Button>
        <Button
          onClick={() => handleMediator(product)}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Phone className="w-4 h-4 ml-2" />
          واسط
        </Button>
      </div>
    </Card>
  );

  const ProductListItem = ({ product }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {product.images && product.images.length > 0 ? (
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={`${API_BASE_URL}${product.images[0].image_url}`}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 
                className="text-lg font-semibold cursor-pointer hover:text-purple-600 transition-colors"
                onClick={() => handleProductClick(product.id)}
              >
                {product.name}
              </h3>
              <Badge className="bg-purple-600 ml-2">
                {product.price} درهم
              </Badge>
            </div>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <User className="w-4 h-4" />
              <span>{product.seller_username}</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => handleDirectPurchase(product)}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 ml-2" />
                شراء مباشرة
              </Button>
              <Button
                onClick={() => handleMediator(product)}
                variant="outline"
                size="sm"
              >
                <Phone className="w-4 h-4 ml-2" />
                واسط
              </Button>
              <Button
                onClick={() => handleProductClick(product.id)}
                variant="ghost"
                size="sm"
              >
                <Eye className="w-4 h-4 ml-2" />
                عرض
              </Button>
            </div>
          </div>
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
                  <ShoppingCart className="w-8 h-8 text-purple-600" />
                  تسوق
                </h1>
                <p className="mt-2 text-gray-600">
                  اكتشف مجموعة متنوعة من المنتجات
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

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
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
            <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600">
              {searchTerm ? 'لم يتم العثور على منتجات تطابق بحثك' : 'لم يتم إضافة أي منتجات بعد'}
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  السابق
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  التالي
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseProducts;

