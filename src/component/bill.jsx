import React, { useEffect, useState } from 'react';
import '../App.css';
import ProductBillComponent from './product_bill';
import SaveSuccessComponent from './savedbill';
import PaymentPopup from './PaymentPopup';
import axios from 'axios';

const BillComponent = () => {
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [data, setData] = useState([]);
    const [reload,setReload]= useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/api/cart')
            .then(response => {
                setData(response.data.items);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [reload]);

    const handleSaveClick = () => {
        setShowSaveSuccess(true);
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handlePrintClick = () => {
        var b = document.getElementById('cart').innerHTML;
        window.frames["print_frame"].document.body.innerHTML = b;
        window.frames["print_frame"].window.focus();
        window.frames["print_frame"].window.print();
    };
    console.log(data);

    const DeleteCart = async () => {
        const data = {
          items: []
        };
        
        try {
          const response = await axios.put('http://localhost:3002/api/cart', data);
          console.log('Data berhasil dikirim:', response.data);
          setReload(!reload);
        } catch (error) {
          console.error('Error saat mengirim data:', error);
        }
      };
      
      
    return (
        <div className="card rounded pb-4 " style={{ width: "350px" }} >
            <div className='mt-2'>
                <h5>Pesanan</h5>
            </div>
            <div id="cart">
                {data.map((item, index) => (
                    <ProductBillComponent
                        key={index}
                        name={item.name}
                        quantity={item.qty}
                        price={`Rp ${item.price}`}
                        image={item.product.image_url}
                    />
                ))}
            </div>
            <button type="button" onClick={DeleteCart} className="btn btn-outline-danger mr-3 ml-3">
                Clear Cart
            </button>
            <div className='d-flex m-3'>
                <button className="btn btn-success mr-4" onClick={handleSaveClick} style={{ width: "150px" }} type="button">
                    Save Bill
                </button>
                <button
                    className="btn btn-success"
                    onClick={handlePrintClick}
                    style={{ width: "150px" }}
                    type="button"
                >
                    Print Bill
                </button>
            </div>
            <button className="btn btn-primary mr-3 ml-3" onClick={togglePopup} type="button">
                charge Rp 40000
            </button>
            <iframe
                title='print'
                id="printing-frame"
                name="print_frame"
                src="about:blank"
                style={{ display: "none" }}
            />
            {showSaveSuccess && <SaveSuccessComponent />}
            {showPopup && <PaymentPopup onClose={togglePopup} />}
        </div>
    );
};

export default BillComponent;
