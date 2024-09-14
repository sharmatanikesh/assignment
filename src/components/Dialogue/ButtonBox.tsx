import { ReactNode } from 'react';

interface ButtonProps {
  icon: ReactNode;  
  text: string;
  active?: boolean; 
}

function ButtonBox({ icon, text, active = false }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center p-2 rounded-lg text-sm font-medium text-right border 
      ${active ? 'bg-green-100' : 'bg-white'} hover:bg-green-100`}
    >
      <span className="border border-gray-300 p-1 rounded-md">
        {icon}
      </span>
      <span className="ml-2 truncate font-bold text-gray-800">
        {text}
      </span>
    </button>
  );
}

export default ButtonBox;
