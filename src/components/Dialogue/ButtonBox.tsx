import { ReactNode, useState } from 'react';
import Experience from './Experience';
import Education from './Education';

interface ButtonProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
}

function ButtonBox({ icon, text, active = false }: ButtonProps) {
  const [isOpen,setIsOpen]= useState<boolean>(true);
  const handleOnClick=()=>{
    setIsOpen(!isOpen)
  }

  return (
    <>
    <button
      className={`inline-flex items-center  w-full p-2 rounded-lg text-sm font-medium border 
      ${active ? 'bg-green-100' : 'bg-white'} hover:bg-green-100`}
      onClick={handleOnClick}
    >
      <span className="border border-gray-300 p-1 rounded-md">
        {icon}
      </span>
      <span className="ml-2 font-bold text-gray-800 truncate">
        {text}
      </span>
    </button>
        {text==="eduction"&&<Education/>}
    </>
  );
}

export default ButtonBox;
