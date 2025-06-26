import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Home, Gift, Monitor, Smartphone, Plus, Edit, X, ShoppingCart, Store } from 'lucide-react';

// Navigation Menu Component
const NavigationMenu = ({ isOpen, onClose, currentLanguage, t, isAdmin, onAdminAction }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      id: 'home', 
      label: currentLanguage === 'ar' ? 'الصفحة الرئيسية' : 'Home', 
      icon: Home, 
      path: '/' 
    },
    { 
      id: 'offers', 
      label: currentLanguage === 'ar' ? 'العروض الخاصة' : 'Special Offers', 
      icon: Gift, 
      action: 'scrollToOffers' 
    },
    { 
      id: 'services', 
      label: currentLanguage === 'ar' ? 'خدمات الترفيه' : 'Entertainment Services', 
      icon: Monitor, 
      action: 'scrollToServices' 
    },
    { 
      id: 'web-design', 
      label: currentLanguage === 'ar' ? 'تصميم المواقع' : 'Web Design', 
      icon: Monitor, 
      path: '/digital-products' 
    },
    { 
      id: 'marketplace', 
      label: currentLanguage === 'ar' ? 'السوق' : 'Marketplace', 
      icon: Store, 
      action: 'openMarketplace' 
    }
  ];

  const handleItemClick = (item) => {
    if (item.path) {
      // Navigate to different page
      onClose();
    } else if (item.action) {
      // Handle different actions
      if (item.action === 'openMarketplace') {
        onAdminAction('openMarketplace');
      } else {
        onAdminAction(item.action);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Menu Panel */}
      <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              {currentLanguage === 'ar' ? 'القائمة' : 'Menu'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return item.path ? (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 w-full text-right"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                {currentLanguage === 'ar' ? 'إدارة' : 'Admin'}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onAdminAction('showAddService');
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 w-full text-right"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">إضافة خدمة</span>
                </button>
                <button
                  onClick={() => {
                    onAdminAction('showOfferManagement');
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 w-full text-right"
                >
                  <Edit className="w-5 h-5" />
                  <span className="font-medium">إدارة العروض</span>
                </button>
              </div>
            </div>
          )}

          {/* Contact Button */}
          <div className="mt-8">
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
              onClick={() => {
                onAdminAction('scrollToContact');
                onClose();
              }}
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              {currentLanguage === 'ar' ? 'اطلب الآن' : 'Order Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;

