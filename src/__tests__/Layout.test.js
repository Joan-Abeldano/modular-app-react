import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

jest.mock('../components/Header/Header.js', () => {
    return function MockHeader({ themeSwitcher }) {
        return (
            <header data-testid="mock-header">
            Mock Header {themeSwitcher}
            </header>
        );
    };
});

jest.mock('../components/ThemeSwitcher/ThemeSwitcher', () => {
    return function MockThemeSwitcher() {
        return <button data-testid="mock-theme-switcher">Theme</button>;
    };
});

describe('Layout Component', () => {
    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
            {component}
            </BrowserRouter>
        );
    };
    
    test('renders Header and main content area', () => {
        renderWithRouter(<Layout />);
        
        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        
        expect(main).toBeEmptyDOMElement(); // Inicialmente vacío porque no hay rutas hijas en el test
    });
    
    test('passes ThemeSwitcher to Header', () => {
        renderWithRouter(<Layout />);
        
        expect(screen.getByTestId('mock-theme-switcher')).toBeInTheDocument();
        
        const header = screen.getByTestId('mock-header');
        expect(header).toHaveTextContent('Mock Header');
    });
});