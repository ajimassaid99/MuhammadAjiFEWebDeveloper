import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TabelFood = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/product')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='' style={{ marginLeft: '80px', marginTop: '20px' }}>
      <p className='text-left'>Tambah Menu Makanan Yang ada di resto</p>
      <div className='card p-4 shadow' style={{ width: '90vw', display: 'flex', alignItems: 'center' }}>
        <div className='text-left mb-3' style={{ width: '100%' }}>
          <Link to='/addfood' className='btn btn-primary'>Tambah</Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col text-left" style={{ width: '40vw' }}>Nama</th>
              <th scope="col">Foto</th>
              <th scope="col">Harga</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td><img src={item.image_url} className="card-img-top" style={{ width: "80px" }} alt={item.name} /></td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelFood;
