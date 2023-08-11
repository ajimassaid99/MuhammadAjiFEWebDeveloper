import React, { useEffect, useState } from 'react';
import './PaymentPopup.css';
import axios from 'axios';

const PaymentPopup = ({ onClose }) => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3002/api/cart')
      .then(response => {
        setData(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handlePayment = () => {
    const totalAmount = data.reduce((total, item) => total + item.price * item.qty, 0);
    const payment = parseFloat(paymentAmount);
    const calculatedChange = payment - totalAmount;
    setChange(calculatedChange);
  };

  return (
    <div className="payment-popup">
      <div className='payment-content'>
        <h2 className='text-left'>Detail Pesanan</h2>
        <div className="row ">
          <div className='m-4'>
            <table className="table p-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">nama</th>
                  <th scope="col">foto</th>
                  <th scope="col">harga</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{item.name} x{item.qty}</td>
                    <td><img src={item.product.image_url} className="card-img-top" style={{ width: "80px" }} alt="Sate Ayam" /></td>
                    <td>Rp {item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="payment-input">
              <label>Uang Pembeli(Rp)</label>
              <input type="number" className='p-1 m-4' value={paymentAmount} onChange={handlePaymentChange} />
            </div>
            <div>
              <button className="btn btn-outline-secondary pr-4 pl-4  mr-4" onClick={onClose}>close</button>
              <button className='btn btn-primary pr-4 pl-4' onClick={handlePayment}>pay!</button>
            </div>
            <div className='row m-4'>
              <p className={`text-left ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                {change >= 0 ? `Kembalian: Rp ${change}` : `Kurang: Rp ${Math.abs(change)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
