import React from 'react';
import '../App.css';

const ProductComponent = ({ name, price, image, _id,onAddToCart }) => {
  return (
   
    <button style={{backgroundColor:'transparent',border:'none'}} onClick={() => onAddToCart({ name, price,_id })}>
   <div className="card" style={{ width: "250px" }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="text-center">
        <p className="">{name}</p>
        <p className='text-primary'>Rp {price}</p>
      </div>
    </div>
    </button>
  );
};

export default ProductComponent;
