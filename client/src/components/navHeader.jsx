import React from 'react';

function Header() {
  return (
    <header>
      <div className="container0">
        <div className="logo">Pizza <span>Palace</span></div>
        <nav>
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#Menu">Menu</a></li>
            <li><a href="#Cart">Cart</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
