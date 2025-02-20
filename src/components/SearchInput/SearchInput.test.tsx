import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ImageGalleryContext, ImageGalleryContextProps } from '../../context/ImageGalleryContext';
import { SearchInput } from './SearchInput';

jest.mock("./style.css", () => ({}));

describe('SearchInput', () => {

    const setupWithContext = (contextValue?: Partial<ImageGalleryContextProps>) => {
        return render(
            <ImageGalleryContext.Provider
                value={{
                    searchTerm: '',
                    setSearchTerm: jest.fn(),
                    imageId: '',
                    setImageId: jest.fn(),
                    debouncedSearchTerm: '',
                    ...contextValue
                }}>
                {<SearchInput />}
            </ImageGalleryContext.Provider>
        );
    };

    afterEach(() => {
        cleanup();
    });

    test('renders the search input with the correct placeholder', () => {
        setupWithContext();
        expect(screen.getByPlaceholderText('Start typing to search for images...')).toBeInTheDocument();
    });

    test('displays the current search term', () => {
        setupWithContext({ searchTerm: 'test' });
        const input = screen.getByPlaceholderText('Start typing to search for images...');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input).toHaveValue('test');
    });
});