import React from 'react';
import '../App.css';

const ProductBillComponent = ({ name, quantity, price, image }) => {
  return (
    <div className="container">
      <div className="row pb-2 mb-2">
        <div className="col-7 d-flex justify-content-between align-items-center">
          <img src={image} className="card-img-top" style={{ width: "80px" }} alt={name} />
          <p className="mb-0">{name}</p>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center">
          <p className="mb-0">x{quantity}</p>
          <p className="mb-0 price text-primary">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductBillComponent;
