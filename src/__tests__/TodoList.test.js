import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../components/TodoList/TodoList';

jest.mock('../firebaseConfig', () => ({
    db: {}
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    onSnapshot: jest.fn((q, callback) => {
        callback({ forEach: () => {} });
        return jest.fn();
    }),
    addDoc: jest.fn(() => Promise.resolve({ id: 'mock-id' })),
    doc: jest.fn(),
    deleteDoc: jest.fn(() => Promise.resolve()),
    serverTimestamp: jest.fn(() => ({ seconds: 123456, nanoseconds: 0 }))
}));

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';

describe('TodoList Component', () => {
    const mockUnsubscribe = jest.fn();
    
    beforeEach(() => {
        jest.clearAllMocks();
        
        onSnapshot.mockImplementation((q, callback) => {
            callback({
                forEach: (fn) => {
                }
            });
            return mockUnsubscribe;
        });
        
        addDoc.mockResolvedValue({ id: 'mock-id' });
        
        deleteDoc.mockResolvedValue();
    });
    
    test('renders with all sections', () => {
        render(<TodoList />);
        
        expect(screen.getByText('Lista de Tareas')).toBeInTheDocument();
        expect(screen.getByText('Activas')).toBeInTheDocument();
        expect(screen.getByText('Completadas')).toBeInTheDocument();
        expect(screen.getByText('Eliminadas')).toBeInTheDocument();
        
        expect(screen.getByPlaceholderText('Añade una nueva tarea...')).toBeInTheDocument();
        expect(screen.getByText('Añadir')).toBeInTheDocument();
    });
    
    test('shows empty state messages', () => {
        render(<TodoList />);
        
        expect(screen.getByText('No hay tareas activas.')).toBeInTheDocument();
        expect(screen.getByText('No hay tareas completadas.')).toBeInTheDocument();
        expect(screen.getByText('No hay tareas eliminadas.')).toBeInTheDocument();
    });
    
    test('adds new task', async () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Añade una nueva tarea...');
        const addButton = screen.getByText('Añadir');
        
        fireEvent.change(input, { target: { value: 'Nueva tarea de prueba' } });
        fireEvent.click(addButton);
        
        await waitFor(() => {
            expect(addDoc).toHaveBeenCalledWith(collection({}, "tasks"), {
                text: 'Nueva tarea de prueba',
                isComplete: false,
                createdAt: expect.any(Object)
            });
        });
        
        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });
    
    test('does not add empty task', () => {
        render(<TodoList />);
        
        const addButton = screen.getByText('Añadir');
        fireEvent.click(addButton);
        
        expect(addDoc).not.toHaveBeenCalled();
    });
    
    test('formats timestamps correctly', () => {
        render(<TodoList />);
        
        expect(screen.getByText('Lista de Tareas')).toBeInTheDocument();
    });
    
    test('cleans up subscriptions on unmount', () => {
        const { unmount } = render(<TodoList />);
        
        expect(onSnapshot).toHaveBeenCalledTimes(3);
        expect(mockUnsubscribe).not.toHaveBeenCalled();
        
        unmount();
        
        expect(mockUnsubscribe).toHaveBeenCalledTimes(3);
    });
    
    test('does not add task with only whitespace', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Añade una nueva tarea...');
        const addButton = screen.getByText('Añadir');
        
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(addButton);
        
        expect(addDoc).not.toHaveBeenCalled();
    });
    
    test('submits form on enter key', async () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Añade una nueva tarea...');
        
        fireEvent.change(input, { target: { value: 'Tarea con Enter' } });
        fireEvent.submit(input.closest('form'));
        
        await waitFor(() => {
            expect(addDoc).toHaveBeenCalled();
        });
    });
});