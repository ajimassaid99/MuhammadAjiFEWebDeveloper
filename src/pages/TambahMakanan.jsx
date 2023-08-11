import React, { useState } from 'react';
import axios from 'axios';

const AddFood = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  const [file, setFile] = useState(null);
  const handleDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    setFile(imageFile);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append("image", file);

    axios.post('http://localhost:3002/api/product', formData)
      .then(response => {
        alert('Data Berhasil di simpan');
        window.location='../food'
        setName('');
        setPrice('');
        setSelectedImage(null);
      })
      .catch(error => {
        console.error('Error saat menambahkan data:', error);
      });
  };

  return (
    <div className='' style={{ marginLeft: '80px', marginTop: '20px' }}>
      <div className='card p-4 shadow' style={{ width: '90vw', display: 'flex', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Nama</label>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='image' className='form-label'>Gambar</label>
            <div
              className='border rounded p-3'
              style={{ border: '2px dashed #ccc', cursor: 'pointer', height: '200px',width: '80vw'  }}
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <input
                type='file'
                accept='image/*'
                className='d-none'
                onChange={handleFileChange}
                id='fileInput'
              />
              <label htmlFor='fileInput'>
                {selectedImage ? (
                  <img src={selectedImage} alt='Pilihan Gambar'  style={{height:'170px'}} />
                ) : (
                  <p className='text-center' style={{ width: '80vw',height:'200px' }}>Drag & drop atau klik untuk pilih gambar</p>
                )}
              </label>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='price' className='form-label'>Harga</label>
            <div className="input-group flex-nowrap">
              <span className="input-group-text bg-primary text-white" id="addon-wrapping">
                Rp
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="addon-wrapping"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>Tambah</button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;