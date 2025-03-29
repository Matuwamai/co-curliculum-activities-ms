import React from "react";
import { Link } from "react-router-dom";

const DashCard = ({ title, subtitle, iconClass, count, link }) => {
  return (
    <Link to={link} className='bg-white p-4 rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center'>
      <div className='flex items-center space-x-4'>
        <div className='text-blue-500'>{iconClass()}</div>
        <div>
          <h6 className='text-lg font-semibold text-blue-400'>{title}</h6>
          <p className='text-gray-600'>{subtitle}</p>
          <p className='text-xl text-blue-400'>{count}</p>
        </div>
      </div>
    </Link>
  );
};

export default DashCard;
