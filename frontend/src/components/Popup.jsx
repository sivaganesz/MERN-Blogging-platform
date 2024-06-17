import React from 'react';

export const Popup = ({ message, onClose ,icon}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-80 h-40 flex flex-col items-center justify-center relative">
        <p className='font-semibold'>{message}</p>
        <img src={icon} alt="" className='w-16 h-16 mt-3 ml-3'/>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2">
            X
        </button>
      </div>
    </div>
  );
};
