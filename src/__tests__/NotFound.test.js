import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('NotFound Component', () => {
    const mockNavigate = jest.fn();
    
    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });
    
    const renderWithRouter = (component) => {
        return render(
            <BrowserRouter>
            {component}
            </BrowserRouter>
        );
    };
    
    test('renders 404 page correctly', () => {
        renderWithRouter(<NotFound />);
        
        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page not found')).toBeInTheDocument();
        expect(screen.getByText(/Sorry — the page you are looking for does not exist./)).toBeInTheDocument();
        
        expect(screen.getByText('Go back')).toBeInTheDocument();
        expect(screen.getByText('Go to Home')).toBeInTheDocument();
    });
    
    test('has proper accessibility attributes', () => {
        renderWithRouter(<NotFound />);
        
        const main = screen.getByRole('main');
        expect(main).toHaveAttribute('aria-labelledby', 'notfound-title');
        
        const title = screen.getByText('404');
        expect(title).toHaveAttribute('id', 'notfound-title');
    });
    
    test('Go back button calls navigate(-1)', () => {
        renderWithRouter(<NotFound />);
        
        const goBackButton = screen.getByText('Go back');
        fireEvent.click(goBackButton);
        
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
    
    test('Go to Home link has correct href', () => {
        renderWithRouter(<NotFound />);
        
        const homeLink = screen.getByText('Go to Home');
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
});