import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

jest.mock('../components/Icons/Logo', () => {
    return function MockLogo() {
        return <div data-testid="mock-logo">Logo</div>;
    };
});

describe('Header Component', () => {
    const mockThemeSwitcher = <button data-testid="theme-switcher">Toggle</button>;
    
    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
            {component}
            </BrowserRouter>
        );
    };
    
    test('renders logo and navigation links', () => {
        renderWithRouter(<Header themeSwitcher={mockThemeSwitcher} />);
        
        expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
        
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Tareas')).toBeInTheDocument();
        expect(screen.getByText('Directorio')).toBeInTheDocument();
        
        expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Tareas').closest('a')).toHaveAttribute('href', '/tareas');
        expect(screen.getByText('Directorio').closest('a')).toHaveAttribute('href', '/directorio');
    });
    
    test('renders theme switcher', () => {
        renderWithRouter(<Header themeSwitcher={mockThemeSwitcher} />);
        expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    });
    
    test('has correct class names', () => {
        renderWithRouter(<Header themeSwitcher={mockThemeSwitcher} />);
        
        const header = screen.getByRole('banner');
        expect(header).toHaveClass('app-header');
        
        expect(screen.getByTestId('mock-logo').closest('a')).toHaveClass('logo');
    });
});