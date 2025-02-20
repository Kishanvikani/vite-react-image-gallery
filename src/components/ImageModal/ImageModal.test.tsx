import { render, screen } from '@testing-library/react';
import { useGetImageDetailsQuery } from '../../api/photo.api.slice';
import { ImageModal } from './ImageModal';

jest.mock("./style.css", () => ({}));
jest.mock("../Loader/style.css", () => ({}));
jest.mock("react-responsive-modal/styles.css", () => ({}));
// Mocked the hook here but we can actually test using msw writing handlers for the api calls
jest.mock('../../api/photo.api.slice', () => ({
    useGetImageDetailsQuery: jest.fn(),
}));

describe('ImageModal', () => {

    const setup = (open: boolean, imageId: string, isFetching: boolean = false) => {
        const mockImage = {
            urls: {
                regular: 'https://example.com/photo.jpg',
            },
            alt_description: 'Example image',
        };
        const onClose = jest.fn();
        (useGetImageDetailsQuery as jest.Mock).mockReturnValue({
            data: isFetching ? null : mockImage,
            isFetching,
        });

        render(<ImageModal open={open} onClose={onClose} imageId={imageId} />);
    };

    test('renders the modal when open is true', () => {
        setup(true, '1');
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('does not render the modal when open is false', () => {
        setup(false, '1');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('renders the loading message when isFetching is true', () => {
        setup(true, '1', true);
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    test('renders the image when data is available', () => {
        setup(true, '1');
        const imgElement = screen.getByAltText('Example image');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });
});