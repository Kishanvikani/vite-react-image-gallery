import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetSearchedImagesQuery } from "../../api/photo.api.slice";
import { getAllPhotos, resetPhotos } from "../../feature/photo.slice";
import { useImageGalleryContext } from "../../hooks/useImageGalleryContext";
import { useAppSelector } from "../../redux/store";
import Article from "../Article/Article";
import { ImageModal } from "../ImageModal/ImageModal";
import { Loader } from "../Loader/Loader";
import './style.css';

// Not added test case as requires lot of mocking here including the store.
export const ImageGrid = () => {
    const [page, setPage] = useState(1);
    const { imageId, setImageId, debouncedSearchTerm } = useImageGalleryContext();

    const images = useAppSelector(getAllPhotos);
    const dispatch = useDispatch();

    const { isFetching } = useGetSearchedImagesQuery({ page, searchTerm: debouncedSearchTerm }, {
        skip: !debouncedSearchTerm
    });

    useEffect(() => {
        if (debouncedSearchTerm) {
            setPage(1);
            dispatch(resetPhotos());
        }
    }, [debouncedSearchTerm, dispatch, setPage]);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isFetching) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isFetching, setPage]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 1.0,
        });

        const currentObserverRef = observerRef.current;
        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [handleIntersection]);

    const getPlaceHolderScreen = () => {
        if (!debouncedSearchTerm) {
            return null;
        } else if (!isFetching && !images.length) {
            return <div className='center-content'>No Results Found</div>;
        }
        return null;
    };

    return (
        <>
            <section className='grid-container'>
                {images && images.map((image) =>
                    <Article
                        image={image}
                        key={image.id}
                        onClick={setImageId}
                    />
                )}
                <div ref={observerRef} className="trigger-div"></div>
            </section>
            <Loader isLoading={isFetching}>
                {getPlaceHolderScreen()}
            </Loader>
            {imageId
                && <ImageModal
                    open={!!imageId}
                    onClose={() => setImageId("")}
                    imageId={imageId}
                />
            }
        </>
    );
};