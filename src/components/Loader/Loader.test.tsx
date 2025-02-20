import { cleanup, render, screen } from '@testing-library/react';
import { Loader } from './Loader';

jest.mock("./style.css", () => ({}));

describe('Loader', () => {
    const setup = (isLoading: boolean, message?: string) => {
        render(<Loader isLoading={isLoading} message={message}>Content</Loader>);
    };

    afterEach(() => {
        cleanup();
    });

    test('renders the loading message when isLoading is true', () => {
        setup(true, "Loading Content...");
        expect(screen.getByText('Loading Content...')).toBeInTheDocument();
    });

    test('renders the default loading message when isLoading is true and no message is provided', () => {
        setup(true);
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    test('renders the children when isLoading is false', () => {
        setup(false);
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('does not render the loading message when isLoading is false', () => {
        setup(false);
        expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });
});