import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from '@/components/ui/badge.jsx';
import { Plus } from 'lucide-react';

const ServiceDetail = ({ services, API_BASE_URL }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    if (services && services.length > 0) {
      const foundService = services.find(s => s.id === id);
      if (foundService) {
        setService(foundService);
      } else {
        // If service not found, navigate back to home or show a 404
        navigate('/'); 
      }
    }
  }, [id, services, navigate]);

  if (!service) {
    return <div className="text-center py-16">جاري تحميل تفاصيل الخدمة...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50" dir="rtl">
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Button onClick={() => navigate('/')} className="mb-8">العودة إلى الخدمات</Button>
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
                {service.logo_url ? (
                  <img src={`${API_BASE_URL}${service.logo_url}`} alt={service.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">لا توجد صورة</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl">{service.name}</CardTitle>
              <CardDescription className="text-lg">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-green-600">{service.price} درهم</span>
                <span className="text-xl text-gray-500 line-through ml-2">{service.original_price} درهم</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">الميزات:</h4>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-lg text-gray-700">
                    <Plus className="w-5 h-5 mr-2 text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-4"
                  onClick={() => window.open(`https://api.whatsapp.com/send/?phone=212633785269&text=أرغب في شراء خدمة ${service.name}&type=phone_number&app_absent=0`, '_blank')}
                >
                  شراء الآن عبر واتساب
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;


