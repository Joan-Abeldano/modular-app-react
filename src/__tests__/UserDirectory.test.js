import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserDirectory from '../components/UserDirectory/UserDirectory';

global.fetch = jest.fn();

describe('UserDirectory Component', () => {
    const mockUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            website: 'john.com'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            website: 'jane.com'
        }
    ];
    
    beforeEach(() => {
        fetch.mockClear();
    });
    
    test('shows loading state initially', () => {
        fetch.mockImplementation(() => 
            new Promise(() => {})
    );
    
    render(<UserDirectory />);
    expect(screen.getByText('Cargando los usuarios')).toBeInTheDocument();
});

test('displays users after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers
    });
    
    render(<UserDirectory />);
    
    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('john.com')).toBeInTheDocument();
    expect(screen.getByText('jane.com')).toBeInTheDocument();
});

test('shows error message when fetch fails', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValueOnce(new Error(errorMessage));
    
    render(<UserDirectory />);
    
    await waitFor(() => {
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
});

test('shows error message when response is not ok', async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
    });
    
    render(<UserDirectory />);
    
    await waitFor(() => {
        expect(screen.getByText(/Error: La respuesta de la red no fue satisfactoria/)).toBeInTheDocument();
    });
});
});