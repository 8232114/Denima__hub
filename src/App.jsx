import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadServices() {
      try {
        // Use import.meta.glob to dynamically import all JSON files from the services directory
        const modules = import.meta.glob('./data/services/*.json');
        const loadedServices = [];

        for (const path in modules) {
          const module = await modules[path]();
          loadedServices.push(module.default); // Assuming default export for JSON
        }
        setServices(loadedServices);
      } catch (err) {
        setError("Failed to load services: " + err.message);
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return <div className="App">Loading services...</div>;
  }

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Our Services</h1>
      <div className="services-list">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="service-item">
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <p>Price: {service.price}</p>
              {service.original_price && <p>Original Price: {service.original_price}</p>}
              {service.color && <p>Color: {service.color}</p>}
              {service.features && service.features.length > 0 && (
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              {service.logo_url && <img src={service.logo_url} alt={service.name} style={{ maxWidth: '100px' }} />} 
            </div>
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
