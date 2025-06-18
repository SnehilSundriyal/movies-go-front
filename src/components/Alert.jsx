import React from 'react';

const Alert = ({ message, class: alertClass, iconSrc }) => {
  if (!message || alertClass === "d-none") {
    return null;
  }

  return (
    <div className={`alert ${alertClass} flex items-center gap-3 p-4 mb-4 rounded-lg`} role="alert">
      {iconSrc && (
        <img src={iconSrc} className="h-6 w-6 shrink-0" alt="" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Alert;