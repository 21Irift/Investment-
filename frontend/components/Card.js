import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20 ${className}`}>
    {children}
  </div>
);

export default Card;
