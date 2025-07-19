import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Search,
  Filter,
  Upload,
  Eye,
  Settings,
  Image as ImageIcon
} from 'lucide-react'

const translations = {
  ar: {
    title: 'لوحة تحكم المسؤول',
    dashboard: 'الرئيسية',
    products: 'المنتجات',
    orders: 'الطلبات',
    users: 'المستخدمين',
    settings: 'الإعدادات',
    addProduct: 'إضافة منتج',
    editProduct: 'تعديل منتج',
    deleteProduct: 'حذف منتج',
    productName: 'اسم المنتج',
    productDescription: 'وصف المنتج',
    productPrice: 'السعر',
    productCategory: 'الفئة الرئيسية',
    productSubcategory: 'الفئة الفرعية',
    productImage: 'صورة المنتج',
    uploadImage: 'تحميل صورة',
    imageUrl: 'رابط الصورة',
    save: 'حفظ',
    cancel: 'إلغاء',
    search: 'بحث...',
    filter: 'تصفية',
    totalProducts: 'إجمالي المنتجات',
    totalOrders: 'إجمالي الطلبات',
    totalUsers: 'إجمالي المستخدمين',
    revenue: 'الإيرادات',
    uploading: 'جاري التحميل...',
    imageUploaded: 'تم تحميل الصورة بنجاح',
    categories: {
      games: 'ألعاب إلكترونية',
      entertainment: 'خدمات ترفيهية',
      other_services: 'خدمات أخرى'
    },
    subcategories: {
      // Games subcategories
      pc: 'ألعاب PC',
      ps: 'ألعاب PlayStation',
      xbox: 'ألعاب Xbox',
      mobile: 'ألعاب الجوال',
      
      // Entertainment subcategories
      streaming: 'خدمات البث',
      music: 'خدمات الموسيقى',
      
      // Other services subcategories
      windows_activation: 'تفعيل Windows',
      accounts: 'حسابات',
      followers: 'زيادة المتابعين',
      websites: 'إنشاء مواقع ويب'
    },
    status: {
      active: 'نشط',
      inactive: 'غير نشط',
      pending: 'في الانتظار',
      completed: 'مكتمل'
    }
  },
  en: {
    title: 'Admin Dashboard',
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    users: 'Users',
    settings: 'Settings',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    deleteProduct: 'Delete Product',
    productName: 'Product Name',
    productDescription: 'Product Description',
    productPrice: 'Price',
    productCategory: 'Main Category',
    productSubcategory: 'Subcategory',
    productImage: 'Product Image',
    uploadImage: 'Upload Image',
    imageUrl: 'Image URL',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search...',
    filter: 'Filter',
    totalProducts: 'Total Products',
    totalOrders: 'Total Orders',
    totalUsers: 'Total Users',
    revenue: 'Revenue',
    uploading: 'Uploading...',
    imageUploaded: 'Image uploaded successfully',
    categories: {
      games: 'Electronic Games',
      entertainment: 'Entertainment Services',
      other_services: 'Other Services'
    },
    subcategories: {
      // Games subcategories
      pc: 'PC Games',
      ps: 'PlayStation Games',
      xbox: 'Xbox Games',
      mobile: 'Mobile Games',
      
      // Entertainment subcategories
      streaming: 'Streaming Services',
      music: 'Music Services',
      
      // Other services subcategories
      windows_activation: 'Windows Activation',
      accounts: 'Accounts',
      followers: 'Followers Boost',
      websites: 'Website Creation'
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed'
    }
  }
}

export default function AdminDashboard({ language = 'ar', setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isUploading, setIsUploading] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'games',
    subcategory: '',
    description: '',
    price: '',
    image_url: '',
    platforms: [],
    features: [],
    is_popular: false
  })

  const t = translations[language]

  useEffect(() => {
    fetchProducts()
    fetchOrders()
    fetchTotalUsers()
    fetchTotalRevenue()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/admin/products`)
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/orders`)
      const data = await response.json()
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(`/upload-image`, {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      if (data.success) {
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image_url: data.image_url })
        } else {
          setNewProduct({ ...newProduct, image_url: data.image_url })
        }
        alert(t.imageUploaded)
      } else {
        alert('Error uploading image: ' + data.error)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      })
      
      const data = await response.json()
      if (data.success) {
        setProducts([...products, data.product])
        setNewProduct({
          name: '',
          category: 'games',
          subcategory: '',
          description: '',
          price: '',
          image_url: '',
          platforms: [],
          features: [],
          is_popular: false
        })
        setShowAddProduct(false)
        alert('تم إضافة المنتج بنجاح')
      } else {
        alert('خطأ في إضافة المنتج: ' + data.error)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('خطأ في إضافة المنتج')
    }
  }

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct)
      })
      
      const data = await response.json()
      if (data.success) {
        setProducts(products.map(p => p.id === editingProduct.id ? data.product : p))
        setEditingProduct(null)
        alert('تم تحديث المنتج بنجاح')
      } else {
        alert('خطأ في تحديث المنتج: ' + data.error)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('خطأ في تحديث المنتج')
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        const response = await fetch(`/products/${productId}`, {
          method: 'DELETE'
        })
        
        const data = await response.json()
        if (data.success) {
          setProducts(products.filter(p => p.id !== productId))
          alert("تم حذف المنتج بنجاح")
          fetchProducts()
        } else {
          alert('خطأ في حذف المنتج: ' + data.error)
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('خطأ في حذف المنتج')
      }
    }
  }

  const getSubcategoriesForCategory = (category) => {
    const subcategoryMap = {
      games: ['pc', 'ps', 'xbox', 'mobile'],
      entertainment: ['streaming', 'music'],
      other_services: ['windows_activation', 'accounts', 'followers', 'websites']
    }
    return subcategoryMap[category] || []
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">{t.totalProducts}</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">{t.totalOrders}</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">{t.totalUsers}</p>
                <p className="text-3xl font-bold">{totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">{t.revenue}</p>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الأنشطة الأخيرة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-sm text-gray-600">{order.product_name}</p>
                </div>
                <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                  {t.status[order.status]}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">جميع الفئات</option>
            <option value="games">{t.categories.games}</option>
            <option value="entertainment">{t.categories.entertainment}</option>
            <option value="other_services">{t.categories.other_services}</option>
          </select>
        </div>
        <Button onClick={() => setShowAddProduct(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          {t.addProduct}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الصورة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    اسم المنتج
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة الفرعية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{t.categories[product.category]}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.subcategory && (
                        <Badge variant="secondary">{t.subcategories[product.subcategory]}</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={product.is_active ? 'default' : 'secondary'}>
                        {product.is_active ? t.status.active : t.status.inactive}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.addProduct}
                <Button variant="ghost" size="sm" onClick={() => setShowAddProduct(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t.productName}</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="أدخل اسم المنتج"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.productCategory}</Label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value, subcategory: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="games">{t.categories.games}</option>
                    <option value="entertainment">{t.categories.entertainment}</option>
                    <option value="other_services">{t.categories.other_services}</option>
                  </select>
                </div>

                <div>
                  <Label>{t.productSubcategory}</Label>
                  <select
                    value={newProduct.subcategory}
                    onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر الفئة الفرعية</option>
                    {getSubcategoriesForCategory(newProduct.category).map(sub => (
                      <option key={sub} value={sub}>{t.subcategories[sub]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>{t.productDescription}</Label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="أدخل وصف المنتج"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <Label>{t.productPrice}</Label>
                <Input
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="مثال: 50$"
                />
              </div>

              <div>
                <Label>{t.productImage}</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload').click()}
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploading ? t.uploading : t.uploadImage}
                    </Button>
                  </div>
                  <Input
                    value={newProduct.image_url}
                    onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                    placeholder={t.imageUrl}
                  />
                  {newProduct.image_url && (
                    <img 
                      src={newProduct.image_url} 
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
                <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                  {t.cancel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t.editProduct}
                <Button variant="ghost" size="sm" onClick={() => setEditingProduct(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t.productName}</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.productCategory}</Label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value, subcategory: '' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="games">{t.categories.games}</option>
                    <option value="entertainment">{t.categories.entertainment}</option>
                    <option value="other_services">{t.categories.other_services}</option>
                  </select>
                </div>

                <div>
                  <Label>{t.productSubcategory}</Label>
                  <select
                    value={editingProduct.subcategory || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر الفئة الفرعية</option>
                    {getSubcategoriesForCategory(editingProduct.category).map(sub => (
                      <option key={sub} value={sub}>{t.subcategories[sub]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>{t.productDescription}</Label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <Label>{t.productPrice}</Label>
                <Input
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                />
              </div>

              <div>
                <Label>{t.productImage}</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('edit-image-upload').click()}
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploading ? t.uploading : t.uploadImage}
                    </Button>
                  </div>
                  <Input
                    value={editingProduct.image_url || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    placeholder={t.imageUrl}
                  />
                  {editingProduct.image_url && (
                    <img 
                      src={editingProduct.image_url} 
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingProduct.is_active}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                />
                <Label htmlFor="is_active">منتج نشط</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdateProduct} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  {t.cancel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <Button variant="outline" onClick={() => setCurrentPage('home')}>
              العودة للموقع
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                {t.dashboard}
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Package className="w-5 h-5" />
                {t.products}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {t.orders}
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                {t.users}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                {t.settings}
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">قسم الطلبات قيد التطوير</p>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">قسم المستخدمين قيد التطوير</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">قسم الإعدادات قيد التطوير</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



  const fetchTotalUsers = async () => {
    try {
      const response = await fetch(`/admin/users/count`)
      const data = await response.json()
      if (data.success) {
        setTotalUsers(data.total_users)
      }
    } catch (error) {
      console.error("Error fetching total users:", error)
    }
  }

  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch(`/admin/revenue`)
      const data = await response.json()
      if (data.success) {
        setTotalRevenue(data.total_revenue)
      }
    } catch (error) {
      console.error("Error fetching total revenue:", error)
    }
  }


