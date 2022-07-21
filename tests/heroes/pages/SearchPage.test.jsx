import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages'


const mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useNavigate: () => mockUseNavigate
}))
describe('Pruebas en <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );
    test('debe de mostrarse correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage></SearchPage>
            </MemoryRouter>
        );

        expect ( container ).toMatchSnapshot();
    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe( 'batman' );

        const img = screen.getByRole('img');
        expect( img.src ).toContain( '/assets/heroes/dc-batman.jpg' );

        const alert = screen.getByLabelText('search');
        expect( alert.style.display ).toBe( 'none' );
    });

    test('debe de mostrar un error si no se muestra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe( 'batman123' );
        

        const alert = screen.getByLabelText( 'alert-danger' );
        expect( alert.style.display ).toBe('')
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {

        const inputValue = 'superman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        // agrega el texto del input 
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue }});

        const form = screen.getByLabelText( 'form' );
        fireEvent.submit( form ); // ejecutando el formulario

        expect ( mockUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);
    })
    
    
    
})
