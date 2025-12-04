import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home/Home';

describe('Home Component', () => {
    test('renders welcome message', () => {
        render(<Home />);
        
        expect(screen.getByText('Bienvenido a la Aplicación de Demostración')).toBeInTheDocument();
        expect(screen.getByText(/Usa la navegación de arriba para visitar el/)).toBeInTheDocument();
        expect(screen.getByText(/Directorio de Usuarios o la Lista de Tareas./)).toBeInTheDocument();
    });
    
    test('has correct heading level', () => {
        render(<Home />);
        
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Bienvenido a la Aplicación de Demostración');
    });
});