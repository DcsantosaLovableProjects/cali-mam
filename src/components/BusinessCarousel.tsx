
import React, { useState, useRef, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

const businesses = [
  {
    id: 1,
    name: "Dulces Momentos",
    description: "Repostería artesanal con los sabores auténticos que a mamá le encantarán. Especialidad en tortas personalizadas y cupcakes decorados.",
    category: "Repostería",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    catalogUrl: "#dulces-momentos"
  },
  {
    id: 2,
    name: "Florería Caleña",
    description: "Arreglos florales únicos con flores frescas y locales. Diseños elegantes para sorprender a mamá en su día especial.",
    category: "Floristería",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    catalogUrl: "#floreria-calena"
  },
  {
    id: 3,
    name: "Artesanías El Valle",
    description: "Joyería y accesorios hechos a mano por artesanos locales. Piezas únicas que reflejan la cultura y tradición vallecaucana.",
    category: "Artesanías",
    imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    catalogUrl: "#artesanias-el-valle"
  },
  {
    id: 4,
    name: "Bienestar Natural",
    description: "Productos orgánicos para el cuidado personal. Sets de regalo con cremas, jabones y aceites esenciales para consentir a mamá.",
    category: "Cuidado Personal",
    imageUrl: "https://images.unsplash.com/photo-1630333339977-b929ce86ac0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    catalogUrl: "#bienestar-natural"
  }
];

const BusinessCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 3;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Actualizamos windowWidth cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determinamos el número de elementos visibles según el ancho de la ventana
  const getVisibleItems = () => {
    if (windowWidth < 640) {
      return 1; // Móvil
    } else if (windowWidth < 1024) {
      return 2; // Tablet
    } else {
      return maxVisibleItems; // Desktop
    }
  };

  const visibleItems = getVisibleItems();
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleItems >= businesses.length 
        ? 0 
        : prevIndex + visibleItems
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - visibleItems < 0 
        ? Math.max(0, businesses.length - visibleItems) 
        : prevIndex - visibleItems
    );
  };

  // Efecto para manejar el desplazamiento del carrusel cuando cambia el índice actual
  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth / visibleItems;
      carouselRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, visibleItems]);
  
  // Mostrar solo el número correcto de tarjetas visibles a la vez
  const visibleBusinesses = businesses.slice(currentIndex, currentIndex + visibleItems);
  
  // Agregar más tarjetas si necesitamos para rellenar la vista (para carrusel circular)
  if (visibleBusinesses.length < visibleItems) {
    visibleBusinesses.push(...businesses.slice(0, visibleItems - visibleBusinesses.length));
  }

  return (
    <section id="negocios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Negocios Locales Destacados</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estos emprendimientos caleños tienen productos especiales para celebrar a mamá.
            Apóyalos y regala algo único, hecho con amor en nuestra ciudad.
          </p>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="carousel gap-4 md:gap-6"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${visibleItems}, 1fr)`,
              scrollSnapType: 'x mandatory',
              overflowX: 'auto',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {businesses.map((business) => (
              <div key={business.id} className="slide px-2">
                <BusinessCard
                  name={business.name}
                  description={business.description}
                  category={business.category}
                  imageUrl={business.imageUrl}
                  catalogUrl={business.catalogUrl}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              className="rounded-full border-cali-pink-dark text-cali-pink-dark hover:bg-cali-pink-light hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              className="rounded-full border-cali-pink-dark text-cali-pink-dark hover:bg-cali-pink-light hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCarousel;
