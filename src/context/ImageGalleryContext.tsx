import React, { createContext, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

export interface ImageGalleryContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  imageId: string;
  setImageId: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchTerm: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ImageGalleryContext = createContext<ImageGalleryContextProps | undefined>(undefined);

export const ImageGalleryProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('coding');
  const [imageId, setImageId] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm);

  return (
    <ImageGalleryContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        imageId,
        setImageId,
        debouncedSearchTerm,
      }}>
      {children}
    </ImageGalleryContext.Provider>
  );
};