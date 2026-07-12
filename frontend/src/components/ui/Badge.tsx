import React from 'react';

interface BadgeProps {
  status: string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  let bgColor = 'bg-gray-500';
  let textColor = 'text-white';

  switch (status.toUpperCase()) {
    case 'AVAILABLE':
      bgColor = 'bg-[#4CAF50]';
      textColor = 'text-black';
      break;
    case 'SUSPENDED':
      bgColor = 'bg-[#FF8A00]';
      textColor = 'text-black';
      break;
    case 'ON_TRIP':
      bgColor = 'bg-[#4A90E2]';
      textColor = 'text-black';
      break;
    case 'OFF_DUTY':
      bgColor = 'bg-[#7B7B7B]';
      textColor = 'text-black';
      break;
  }

  // Format status text (e.g., ON_TRIP -> On Trip)
  const formattedText = status.replace('_', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

  return (
    <span className={`px-4 py-1 rounded-md text-sm font-semibold border-2 border-black shadow-sm ${bgColor} ${textColor}`}>
      {formattedText}
    </span>
  );
};
