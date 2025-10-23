import React from 'react';

const Welcome = ({ nombre }) => {
  const nombreMostrar = nombre === 'Desarrollador' ? 'You are cool' : nombre;
  
  return (
    <div>
      <h2>Bienvenido, {nombreMostrar}!</h2>
      <p>Este es un ejemplo de un componente modularizado.</p>
    </div>
  );
};

export default Welcome;