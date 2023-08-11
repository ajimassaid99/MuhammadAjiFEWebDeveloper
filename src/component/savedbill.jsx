import React, { useState } from 'react';
import '../App.css';

const SaveSuccessComponent = () => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`save-success-popup ${showPopup ? 'active' : ''}`}>
      <div className="popup-content">
        <i className="fa fa-check-circle"></i>
        <h3>Save Berhasil!</h3>
        <p>Data Anda telah berhasil disimpan.</p>
        <button className="btn-close" onClick={closePopup}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default SaveSuccessComponent;
