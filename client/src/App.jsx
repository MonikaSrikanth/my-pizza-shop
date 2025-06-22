import React from 'react';
import Header from './components/navHeader';
import HomeSection from './components/HomeSection';
import MenuSection from './components/MenuSection';
import CartSection from './components/CartSection';
import './styles.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <HomeSection />
        <MenuSection />
        <CartSection />
      </main>
    </>
  );
}

export default App;
