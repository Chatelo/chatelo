import React from 'react';

function Toaster(props) {
  const { showToast, title, message, onClose, type } = props;

  const toastClasses = `fixed top-4 right-4 bg-${type} text-white p-4 rounded-md`;

  return (
    <div
      className={`transition-transform transform ${
        showToast ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className={toastClasses}>
        <button onClick={onClose} className="text-white close-button">
          &times;
        </button>
        <strong className="mx-2">{title}</strong>
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
}

export default Toaster;
