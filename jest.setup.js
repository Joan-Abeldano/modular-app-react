// Importar extensiones de jest-dom
import '@testing-library/jest-dom';

// Mock para matchMedia (necesario para algunos componentes que usan media queries)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Limpiar mocks después de cada test
afterEach(() => {
    jest.clearAllMocks();
});