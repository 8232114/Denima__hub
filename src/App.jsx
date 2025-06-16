import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ServiceDetail from './components/ServiceDetail';
import servicesData from './data/services.json';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Label } from '@/components/ui/label.jsx';
import heroImage from './assets/hero_image.png';
import lightLogo from './assets/light_logo.png';
import './App.css';
import { MessageCircle, Phone, Mail, Plus, Edit, Trash2, LogIn, Upload, X } from 'lucide-react';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://web-production-e7d36.up.railway.app/api' : 'http://localhost:5000/api'

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [showLogin, setShowLogin] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    features: [''],
    color: 'bg-blue-500',
    logo_url: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const contactMethods = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'واتساب',
      value: '+212633785269',
      action: 'whatsapp',
      link: 'https://api.whatsapp.com/send/?phone=212633785269&type=phone_number&app_absent=0'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'هاتف',
      value: '+212633785269',
      action: 'phone',
      link: 'tel:+212633785269'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'بريد إلكتروني',
      value: 'stoream665@gmail.com',
      action: 'email',
      link: 'mailto:stoream665@gmail.com'
    }
  ];

  useEffect(() => {
    fetchServices();
    if (token) {
      verifyToken();
    }
  }, [token]);

  const fetchServices = async () => {
    try {
      // In development, use local JSON file
      if (process.env.NODE_ENV === 'development') {
        setServices(servicesData);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to local data
      setServices(servicesData);
    }
  };

  const verifyToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.user.is_admin);
      } else {
        localStorage.removeItem('admin_token');
        setToken(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setIsAdmin(data.user.is_admin);
        setShowLogin(false);
        setLoginForm({ username: '', password: '' });
      } else {
        alert('خطأ في تسجيل الدخول');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('خطأ في الاتصال');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAdmin(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: passwordForm.oldPassword,
          new_password: passwordForm.newPassword
        })
      });
      
      if (response.ok) {
        alert('تم تغيير كلمة المرور بنجاح');
        setShowChangePassword(false);
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await response.json();
        alert(data.message || 'خطأ في تغيير كلمة المرور');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('خطأ في الاتصال');
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...serviceForm,
          features: serviceForm.features.filter(f => f.trim() !== '')
        })
      });
      
      if (response.ok) {
        fetchServices();
        setShowAddService(false);
        resetServiceForm();
      } else {
        alert('خطأ في إضافة الخدمة');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      alert('خطأ في الاتصال');
    }
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/services/${editingService.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...serviceForm,
          features: serviceForm.features.filter(f => f.trim() !== '')
        })
      });
      
      if (response.ok) {
        fetchServices();
        setEditingService(null);
        resetServiceForm();
      } else {
        alert('خطأ في تحديث الخدمة');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('خطأ في الاتصال');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      try {
        const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          fetchServices();
        } else {
          alert('خطأ في حذف الخدمة');
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('خطأ في الاتصال');
      }
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      name: '',
      description: '',
      price: '',
      original_price: '',
      features: [''],
      color: 'bg-blue-500',
      logo_url: ''
    });
    setImagePreview(null);
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        alert('خطأ في رفع الصورة');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('خطأ في رفع الصورة');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        setServiceForm(prev => ({ ...prev, logo_url: imageUrl }));
      }
    }
  };

  const addFeature = () => {
    setServiceForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index, value) => {
    setServiceForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index) => {
    setServiceForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const startEdit = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price,
      original_price: service.original_price,
      features: service.features.length > 0 ? service.features : [''],
      color: service.color || 'bg-blue-500',
      logo_url: service.logo_url || ''
    });
    setImagePreview(service.logo_url ? `${API_BASE_URL}${service.logo_url}` : null);
  };

  const scrollToContact = () => {
    document.getElementById('contact-section').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-10 h-10 flex items-center justify-center mx-auto mb-4">
                  <img src={lightLogo} alt="Denima__hub Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Denima__hub</h1>
                  <p className="text-sm text-gray-600">حسابات الترفيه الرقمي</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <>
                    <Button 
                      variant="outline"
                      onClick={() => setShowChangePassword(true)}
                      className="text-sm"
                    >
                      تغيير كلمة المرور
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowAddService(true)}
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة خدمة
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleLogout}
                    >
                      تسجيل خروج
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setShowLogin(true)}
                  >
                    <LogIn className="w-4 h-4 ml-2" />
                    تسجيل دخول المسؤول
                  </Button>
                )}
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={scrollToContact}
                >
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home services={services} isAdmin={isAdmin} startEdit={startEdit} handleDeleteService={handleDeleteService} API_BASE_URL={API_BASE_URL} />} />
          <Route path="/service/:id" element={<ServiceDetail services={services} API_BASE_URL={API_BASE_URL} />} />
        </Routes>

        {/* Contact Section */}
        <section id="contact-section" className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              تواصل معنا
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              لأي استفسارات أو طلبات، لا تتردد في التواصل معنا عبر الطرق التالية:
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <a 
                  key={index} 
                  href={method.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 space-x-reverse bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {method.icon}
                  <span className="text-lg font-medium text-gray-800">{method.label}</span>
                </a>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-right">الاسم</Label>
                  <Input id="name" type="text" placeholder="اسمك الكامل" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="بريدك الإلكتروني" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-right">الرسالة</Label>
                  <Textarea id="message" placeholder="رسالتك" rows="5" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  إرسال الرسالة
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 px-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Denima__hub. جميع الحقوق محفوظة.</p>
          </div>
        </footer>

        {/* Login Dialog */}
        <Dialog open={showLogin} onOpenChange={setShowLogin}>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>تسجيل دخول المسؤول</DialogTitle>
              <DialogDescription>
                أدخل بيانات الاعتماد الخاصة بك لتسجيل الدخول.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  اسم المستخدم
                </Label>
                <Input
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  كلمة المرور
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {/* {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>} */}
              <DialogFooter>
                <Button type="submit">تسجيل الدخول</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>تغيير كلمة المرور</DialogTitle>
              <DialogDescription>
                أدخل كلمة المرور القديمة والجديدة.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleChangePassword} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPassword" className="text-right">
                  كلمة المرور القديمة
                </Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  كلمة المرور الجديدة
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  تأكيد كلمة المرور الجديدة
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {/* {passwordChangeError && <p className="text-red-500 text-sm text-center">{passwordChangeError}</p>} */}
              {/* {passwordChangeSuccess && <p className="text-green-500 text-sm text-center">{passwordChangeSuccess}</p>} */}
              <DialogFooter>
                <Button type="submit">تغيير كلمة المرور</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Service Dialog */}
        <Dialog open={showAddService || editingService !== null} onOpenChange={() => { setShowAddService(false); setEditingService(null); resetServiceForm(); }}>
          <DialogContent className="sm:max-w-[600px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>{editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'قم بتعديل تفاصيل الخدمة الحالية.' : 'أدخل تفاصيل الخدمة الجديدة.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={editingService ? handleEditService : handleAddService} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">اسم الخدمة</Label>
                <Input
                  id="name"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">الوصف</Label>
                <Textarea
                  id="description"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">السعر (درهم)</Label>
                <Input
                  id="price"
                  type="number"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="original_price" className="text-right">السعر الأصلي (درهم)</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={serviceForm.original_price}
                  onChange={(e) => setServiceForm({ ...serviceForm, original_price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">لون البطاقة</Label>
                <Input
                  id="color"
                  type="text"
                  value={serviceForm.color}
                  onChange={(e) => setServiceForm({ ...serviceForm, color: e.target.value })}
                  className="col-span-3"
                  placeholder="مثال: bg-blue-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo_url" className="text-right">صورة الشعار</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="logo_url"
                    type="file"
                    onChange={handleImageChange}
                    className="col-span-3"
                  />
                  {imagePreview && (
                    <div className="relative w-16 h-16">
                      <img src={imagePreview} alt="معاينة الشعار" className="w-full h-full object-contain" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                          setImagePreview(null);
                          setServiceForm(prev => ({ ...prev, logo_url: '' }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {uploadingImage && <p className="text-sm text-gray-500">جاري الرفع...</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right">الميزات</Label>
                <div className="col-span-3 space-y-2">
                  {serviceForm.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="ميزة الخدمة"
                      />
                      {serviceForm.features.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addFeature}>
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة ميزة
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={uploadingImage}>
                  {editingService ? 'تحديث الخدمة' : 'إضافة الخدمة'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Router>
  );
}

export default App;


