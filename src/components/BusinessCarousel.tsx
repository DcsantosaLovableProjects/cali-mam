
import React, { useState, useRef, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Business, sampleBusinesses } from '../services/excelService';
import ExcelUploader from './ExcelUploader';
import CategoryFilter from './CategoryFilter';

const BusinessCarousel = () => {
  // Estado para los negocios
  const [businesses, setBusinesses] = useState<Business[]>(sampleBusinesses);
  
  // Estado para el filtro de categorías
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Estados para el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 3;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Extraer categorías únicas de los negocios
  const categories = [...new Set(businesses.map(business => business.category))];
  
  // Filtrar los negocios por categoría seleccionada
  const filteredBusinesses = selectedCategory 
    ? businesses.filter(business => business.category === selectedCategory)
    : businesses;

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
  
  // Resetear el índice cuando cambia el filtro o los datos
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, businesses]);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleItems >= filteredBusinesses.length 
        ? 0 
        : prevIndex + visibleItems
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - visibleItems < 0 
        ? Math.max(0, filteredBusinesses.length - visibleItems) 
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
  const visibleBusinesses = filteredBusinesses.slice(currentIndex, currentIndex + visibleItems);
  
  // Agregar más tarjetas si necesitamos para rellenar la vista (para carrusel circular)
  if (visibleBusinesses.length < visibleItems && filteredBusinesses.length > 0) {
    visibleBusinesses.push(...filteredBusinesses.slice(0, visibleItems - visibleBusinesses.length));
  }

  const handleDataLoaded = (newBusinesses: Business[]) => {
    setBusinesses(newBusinesses);
    setSelectedCategory(null);
  };

  return (
    <section id="negocios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Negocios Locales Destacados</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estos emprendimientos caleños tienen productos especiales para celebrar a mamá.
            Apóyalos y regala algo único, hecho con amor en nuestra ciudad.
          </p>
        </div>
        
        {/* Cargador de Excel */}
        <ExcelUploader onDataLoaded={handleDataLoaded} />
        
        {/* Filtro de categorías */}
        {businesses.length > 0 && (
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        )}

        <div className="relative mt-8">
          {filteredBusinesses.length > 0 ? (
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
              {filteredBusinesses.map((business) => (
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
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">No hay negocios para mostrar en esta categoría.</p>
            </div>
          )}

          {filteredBusinesses.length > visibleItems && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessCarousel;
