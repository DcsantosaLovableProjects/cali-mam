
import React from 'react';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-cali-pink-light to-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2">
            <img 
              src="/lovable-uploads/a6a68692-2be2-4294-a75a-679d925a539f.png" 
              alt="Logo Alcaldía de Santiago de Cali" 
              className="h-16 md:h-20"
            />
          </div>
        </div>
        <nav className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
          <a href="#inicio" className="text-gray-800 hover:text-cali-pink-dark transition-colors">Inicio</a>
          <a href="#negocios" className="text-gray-800 hover:text-cali-pink-dark transition-colors">Negocios</a>
          <a href="#contacto" className="text-gray-800 hover:text-cali-pink-dark transition-colors">Contacto</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
