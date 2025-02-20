import { fireEvent, render, screen } from '@testing-library/react';
import { Photo } from '../../models/Photo';
import Article from './Article';

jest.mock("./style.css", () => ({}));

const mockPhoto: Photo = {
    id: '1',
    urls: {
        regular: 'https://example.com/photo.jpg',
        small: 'https://example.com/photo.jpg',
    },
    user: {
        username: 'Test_User',
        name: 'Test User',
        profile_image: {
            medium: 'https://example.com/profile.jpg',
        },
        instagram_username: 'test_user',
    },
    created_at: '2021-01-01T00:00:00Z',
    likes: 100,
    alt_description: 'Example image',
};

describe('Article', () => {
    const handleClick = jest.fn();

    const setup = () => {
        render(<Article image={mockPhoto} onClick={handleClick} />);
    };

    test('renders the image with the correct src and alt attributes', () => {
        setup();
        const imgElement = screen.getByAltText('Example image');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    test('calls onClick with the correct image id when clicked', () => {
        setup();
        const imgElement = screen.getByAltText('Example image');
        fireEvent.click(imgElement);
        expect(handleClick).toHaveBeenCalledWith('1');
    });

    test('renders the user information correctly', () => {
        setup();
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Fri Jan 01 2021')).toBeInTheDocument();
    });

    test('renders the Instagram link and likes correctly', () => {
        setup();
        const instagramLink = screen.getByText('test_user');
        expect(instagramLink).toBeInTheDocument();
        expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/test_user');
        expect(screen.getByText('100 Likes')).toBeInTheDocument();
    });
});