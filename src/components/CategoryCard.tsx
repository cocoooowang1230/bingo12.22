import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  image,
  onClick,
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">{icon}</span>
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
        </div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;