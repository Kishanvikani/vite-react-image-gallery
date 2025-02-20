import { ChangeEvent } from 'react';
import { useImageGalleryContext } from '../../hooks/useImageGalleryContext';
import './style.css';

export const SearchInput = () => {

    const { setSearchTerm, searchTerm } = useImageGalleryContext()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    return (
        <input
            className="search-input"
            type="text"
            placeholder="Start typing to search for images..."
            value={searchTerm}
            onChange={handleInputChange}
        />
    );
};