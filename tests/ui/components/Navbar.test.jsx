import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, Routes, Route } from 'react-router-dom';


const mockUseNavigate = jest.fn();
jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en el componente de <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: '123ABC',
            name: 'Estefany'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario', () => {
        
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Estefany') ).toBeTruthy();
    })

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {
        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );
        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockUseNavigate ).toHaveBeenCalledWith('/login', {'replace': true});
    })
    
    
})
