import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { Eye, EyeOff, User, Mail, Lock, ShoppingBag } from 'lucide-react';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://denima-api-backend-production.up.railway.app/api' : 'http://localhost:5000/api';

const MarketplaceAuth = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('marketplace_token', data.token);
        localStorage.setItem('marketplace_user', JSON.stringify(data.user));
        onLoginSuccess(data.user, data.token);
        onClose();
        setLoginForm({ username: '', password: '' });
      } else {
        setError(data.error || 'فشل في تسجيل الدخول');
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('marketplace_token', data.token);
        localStorage.setItem('marketplace_user', JSON.stringify(data.user));
        onLoginSuccess(data.user, data.token);
        onClose();
        setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(data.error || 'فشل في إنشاء الحساب');
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setLoginForm({ username: '', password: '' });
    setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForms();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <ShoppingBag className="w-6 h-6 text-purple-600" />
            {isLogin ? 'تسجيل الدخول إلى السوق' : 'إنشاء حساب جديد'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isLogin 
              ? 'سجل دخولك للوصول إلى السوق وإضافة منتجاتك' 
              : 'أنشئ حسابًا جديدًا للبدء في البيع والشراء'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم أو البريد الإلكتروني</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="أدخل اسم المستخدم أو البريد الإلكتروني"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="pr-10 pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-username">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-username"
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="pr-10 pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-confirm-password">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="reg-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أعد إدخال كلمة المرور"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </Button>
            </form>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-sm text-purple-600 hover:text-purple-700 underline"
            >
              {isLogin 
                ? 'ليس لديك حساب؟ إنشاء حساب جديد' 
                : 'لديك حساب بالفعل؟ تسجيل الدخول'
              }
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketplaceAuth;

