import { useEffect, useState } from 'react';

export const Header = () => {
    const text = "PhotoFindX – Search & discover breathtaking shots";
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [index]);

    return <h2 className='auto-type-text'>{displayedText}</h2>;
};