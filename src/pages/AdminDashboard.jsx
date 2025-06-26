import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Shield, 
  Users, 
  Package, 
  Ban, 
  Trash2, 
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const API_BASE_URL = 'https://denima-api-backend-production.up.railway.app/api';

const AdminDashboard = ({ user, token }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: { total: 0, banned: 0, admins: 0, recent: 0 },
    products: { total: 0, active: 0, recent: 0 }
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user?.is_admin) {
      navigate('/marketplace');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchStats(),
        fetchUsers(),
        fetchProducts()
      ]);
    } catch (error) {
      setError('خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBanUser = async (userId, username) => {
    if (!confirm(`هل أنت متأكد من حظر المستخدم ${username}؟`)) {
      return;
    }

    const reason = prompt('سبب الحظر (اختياري):') || 'لم يتم تحديد السبب';

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/ban`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        fetchUsers();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('خطأ في حظر المستخدم');
    }
  };

  const handleUnbanUser = async (userId, username) => {
    if (!confirm(`هل أنت متأكد من إلغاء حظر المستخدم ${username}؟`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/unban`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        fetchUsers();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('خطأ في إلغاء حظر المستخدم');
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (!confirm(`هل أنت متأكد من حذف المنتج "${productName}"؟ هذا الإجراء لا يمكن التراجع عنه.`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        fetchProducts();
        fetchStats(); // تحديث الإحصائيات
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('خطأ في حذف المنتج');
    }
  };

  if (!user?.is_admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-red-600" />
                  لوحة تحكم المسؤول
                </h1>
                <p className="mt-2 text-gray-600">
                  إدارة المستخدمين والمنتجات
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.users.recent} جديد هذا الأسبوع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين المحظورين</CardTitle>
              <Ban className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.users.banned}</div>
              <p className="text-xs text-muted-foreground">محظور</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.products.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.products.recent} جديد هذا الأسبوع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المنتجات النشطة</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.products.active}</div>
              <p className="text-xs text-muted-foreground">نشط</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>إدارة المستخدمين</CardTitle>
            <CardDescription>عرض وإدارة جميع المستخدمين</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">جاري التحميل...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-2">المستخدم</th>
                      <th className="text-right py-2">البريد الإلكتروني</th>
                      <th className="text-right py-2">المنتجات</th>
                      <th className="text-right py-2">الحالة</th>
                      <th className="text-right py-2">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">
                          <div>
                            <div className="font-medium">{user.username}</div>
                            {user.is_admin && (
                              <Badge variant="secondary" className="text-xs">
                                مسؤول
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">{user.products_count}</td>
                        <td className="py-3">
                          {user.is_banned ? (
                            <Badge variant="destructive">
                              <Ban className="w-3 h-3 mr-1" />
                              محظور
                            </Badge>
                          ) : (
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              نشط
                            </Badge>
                          )}
                        </td>
                        <td className="py-3">
                          {!user.is_admin && (
                            <div className="flex gap-2">
                              {user.is_banned ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUnbanUser(user.id, user.username)}
                                >
                                  إلغاء الحظر
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleBanUser(user.id, user.username)}
                                >
                                  <Ban className="w-4 h-4 mr-1" />
                                  حظر
                                </Button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products Management */}
        <Card>
          <CardHeader>
            <CardTitle>إدارة المنتجات</CardTitle>
            <CardDescription>عرض وإدارة جميع المنتجات</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">جاري التحميل...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-2">المنتج</th>
                      <th className="text-right py-2">البائع</th>
                      <th className="text-right py-2">السعر</th>
                      <th className="text-right py-2">الحالة</th>
                      <th className="text-right py-2">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            {product.description?.substring(0, 50)}...
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <div>{product.seller?.username}</div>
                            {product.seller?.is_banned && (
                              <Badge variant="destructive" className="text-xs">
                                محظور
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3">{product.price} درهم</td>
                        <td className="py-3">
                          {product.is_active ? (
                            <Badge variant="default">نشط</Badge>
                          ) : (
                            <Badge variant="secondary">غير نشط</Badge>
                          )}
                        </td>
                        <td className="py-3">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

