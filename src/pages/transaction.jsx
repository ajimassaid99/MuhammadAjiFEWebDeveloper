import { useEffect, useState } from "react";
import BillComponent from "../component/bill";
import ProductComponent from "../component/product";
import axios from "axios";

function Transaction() {
    const [data, setData] = useState([]);
    const [cart,setCart] =useState([]);
    const [reload,setReload]= useState([]);
    

  useEffect(() => {
    axios.get('http://localhost:3002/api/product')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/api/cart')
        .then(response => {
            setCart(response.data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, [reload]);

const addToCart = (product) => {
  const existingItem = cart.find(item => item.name === product.name);

  if (existingItem) {
    const updatedCart = cart.map(item => {
      if (item.name === product.name) {
        return {
          ...item,
          qty: item.qty + 1
        };
      }
      return item;
    });

    axios.put('http://localhost:3002/api/cart', { items: updatedCart })
      .then(response => {
        setCart(updatedCart);
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
     setReload(!reload);
  } else {
    const existingProduct = data.find(item => item._id === product._id);

    if (existingProduct) {
      const newItem = {
        product: product._id,
        qty: '1'
      };

      const updatedCart = [...cart, newItem];

      axios.put('http://localhost:3002/api/cart', { items: updatedCart })
        .then(response => {
          setCart(updatedCart);
        })
        .catch(error => {
          console.error('Error updating cart:', error);
        });
        setReload(!reload);
    }
  }
};


  return (
      <div className="row text-center">
        <div className="col-sm-6 col-md-8 ">
        <div className="container text-center">
          <div className="row g-2 m-4">
              {data.map(product => (
              <div key={product._id} className="col-4 mb-4">
                <ProductComponent
                  _id = {product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image_url}
                  onAddToCart={addToCart}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="col-3 mt-4 print-only">
          <BillComponent/>
        </div>
      </div>
      
  );
}

export default Transaction;
