import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- Importar Outlet
import Header from '../Header/Header.js';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const Layout = () => {
  return (
    <>
      <Header themeSwitcher={<ThemeSwitcher />} />
      <main>
        {/* El Outlet renderizará el componente de la ruta hija */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;