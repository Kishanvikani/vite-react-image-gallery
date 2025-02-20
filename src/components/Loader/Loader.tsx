import './style.css';

type LoaderProps = {
    isLoading: boolean;
    message?: string;
    children: React.ReactNode;
}

export const Loader = ({ isLoading, message = "Loading", children }: LoaderProps) => {
    return (
        isLoading
            ?
            // <div className="loader">
            //     {message}
            // </div>
            <div className="loader">
                <div className="loading-container">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                {message}
            </div>
            : children
    )
}