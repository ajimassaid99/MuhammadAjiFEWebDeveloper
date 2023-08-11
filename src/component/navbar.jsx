import React from 'react';
import '../App.css';

const NavbarComponent = () => {
  const currentPath = window.location.pathname;
  return (
    <div>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-white">Alan Resto</span>
        </div>
      </nav>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a
            className={
              currentPath !== '/' ? 'nav-link active' : 'nav-link'
            }
            aria-current="page"
            href="/Food"
          >
            Food
          </a>
        </li>
        <li className="nav-item">
          <a
            className={currentPath === '/' ? 'nav-link active' : 'nav-link'}
            href="/"
          >
            Transaksi
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavbarComponent;