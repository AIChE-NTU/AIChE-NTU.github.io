
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-surface rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 h-full ${className}`}>
      {children}
    </div>
  );
};

export default Card;
