import { useContext } from "react";
import { ImageGalleryContext } from "../context/ImageGalleryContext";

export const useImageGalleryContext = () => {
    const context = useContext(ImageGalleryContext);
    if (context === undefined) {
        throw new Error('useImageGalleryContext must be used within a ImageGalleryProvider');
    }
    return context;
}