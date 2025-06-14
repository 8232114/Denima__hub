import React, { useEffect, useState } from 'react'; // أضف useEffect و useState
import { useParams } from 'react-router-dom';

// استقبل prop 'services' بدلاً من 'selectedService'
function ServiceDetail({ services }) {
  const { id } = useParams(); // احصل على الـ ID من الـ URL
  const [selectedService, setSelectedService] = useState(null); // حالة لتخزين الخدمة المحددة

  useEffect(() => {
    // ابحث عن الخدمة المطابقة للـ ID في قائمة الخدمات
    const foundService = services.find(service => service.id === id);
    setSelectedService(foundService);
  }, [id, services]); // أعد تشغيل التأثير عندما يتغير الـ ID أو الخدمات

  if (!selectedService) {
    return <div>Service not found.</div>;
  }

  return (
    <div>
      <h1>{selectedService.name}</h1>
      <p>{selectedService.description}</p>
      <p>Price: ${selectedService.price}</p>
      {selectedService.original_price && <p>Original Price: ${selectedService.original_price}</p>}
      {selectedService.color && <p>Color: {selectedService.color}</p>}
      {selectedService.features && selectedService.features.length > 0 && (
        <div>
          <h3>Features:</h3>
          <ul>
            {selectedService.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {selectedService.image_url && <img src={selectedService.image_url} alt={selectedService.name} />}
    </div>
  );
}

export default ServiceDetail;
