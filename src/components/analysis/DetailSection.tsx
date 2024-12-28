import React from 'react';

interface DetailSectionProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export const DetailSection: React.FC<DetailSectionProps> = ({ icon, title, items }) => {
  if (items.length === 0) return null;
  
  return (
    <div className="mb-4">
      <h4 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
        {icon}
        {title}
      </h4>
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};