
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from 'lucide-react';

interface BusinessCardProps {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  catalogUrl: string;
}

const BusinessCard = ({ 
  name, 
  description, 
  category, 
  imageUrl, 
  catalogUrl 
}: BusinessCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden border-2 border-gray-100 hover:border-cali-pink-light transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="relative pt-[56.25%] overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placeholder.pics/svg/300x200";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="text-xs text-cali-pink-dark font-medium mb-1">{category}</div>
        <CardTitle className="text-xl font-serif">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-gradient-gold text-gray-800 hover:text-white transition-colors"
          asChild
        >
          <a href={catalogUrl} target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ver catálogo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BusinessCard;
