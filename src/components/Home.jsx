import React from 'react';
import { Link } from 'react-router-dom'; // تأكد من استيراد Link

function Home({ services }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
            <p className="text-lg font-bold mt-2">${service.price}</p>
            {service.original_price && (
              <p className="text-sm text-gray-500 line-through">
                Original: ${service.original_price}
              </p>
            )}
            {service.features && service.features.length > 0 && (
              <ul className="list-disc list-inside mt-2">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
            {service.image_url && (
              <img src={service.image_url} alt={service.name} className="mt-4 w-full h-32 object-cover rounded" />
            )}
            {/* Add a link to ServiceDetail */}
            <Link to={`/service/${service.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
