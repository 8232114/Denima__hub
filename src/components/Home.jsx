import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Plus, Edit, Trash2 } from 'lucide-react';
import heroImage from '../assets/hero_image.png'; // Adjust path as needed

const Home = ({ services = [], isAdmin = false, startEdit, handleDeleteService, API_BASE_URL = '' }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img
              src={heroImage}
              alt="Denima Hub - خدمات الترفيه الرقمي"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            استمتع بعالم من الترفيه اللامحدود
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            احصل على حسابات Netflix، Spotify، Shahid VIP، Amazon Prime Video بأفضل الأسعار في المغرب
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ✅ حسابات أصلية ومضمونة
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              💰 أسعار لا تقاوم - 90 درهم فقط
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              🚀 تفعيل فوري
            </Badge>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            خدماتنا المتاحة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services && services.length > 0 ? services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300 relative">
                {isAdmin && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit && startEdit(service)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteService && handleDeleteService(service.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {service.logo_url ? (
                      <img src={`${API_BASE_URL}${service.logo_url}`} alt={service.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">لا توجد صورة</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-green-600">{service.price} درهم</span>
                    {service.original_price && (
                      <span className="text-lg text-gray-500 line-through mr-2">{service.original_price} درهم</span>
                    )}
                  </div>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <Plus className="w-4 h-4 mr-2 text-green-500" /> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 text-center">
                    <a href={`/service/${service.id}`} className="text-blue-600 hover:underline">
                      عرض التفاصيل
                    </a>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">جاري تحميل الخدمات...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

