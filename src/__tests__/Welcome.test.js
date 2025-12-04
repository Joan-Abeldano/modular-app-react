import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from '../components/Welcome/Welcome';

describe('Welcome Component', () => {
    test('renders with custom name', () => {
        render(<Welcome nombre="Carlos" />);
        
        expect(screen.getByText('Bienvenido, Carlos!')).toBeInTheDocument();
        expect(screen.getByText('Este es un ejemplo de un componente modularizado.')).toBeInTheDocument();
    });
    
    test('shows "You are cool" when nombre is "Desarrollador"', () => {
        render(<Welcome nombre="Desarrollador" />);
        
        expect(screen.getByText('Bienvenido, You are cool!')).toBeInTheDocument();
        expect(screen.queryByText('Bienvenido, Desarrollador!')).not.toBeInTheDocument();
    });
    
    test('renders paragraph text', () => {
        render(<Welcome nombre="Test" />);
        
        const paragraph = screen.getByText(/Este es un ejemplo de un componente modularizado./);
        expect(paragraph).toBeInTheDocument();
    });
});