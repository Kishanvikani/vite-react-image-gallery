import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useDispatch } from "react-redux"
import { useGetSearchedImagesQuery } from "../../api/photo.api.slice"
import { getAllPhotos, resetPhotos } from "../../feature/photo.slice"
import { useImageGalleryContext } from "../../hooks/useImageGalleryContext"
import { useAppSelector } from "../../redux/store"
import Article from "../Article/Article"
import { ImageModal } from "../ImageModal/ImageModal"
import { Loader } from "../Loader/Loader"
import './style.css'

// Not added test case as requires lot of mocking here including the store.
export const ImageGrid = () => {

    const [page, setPage] = useState(1)
    const { imageId, setImageId, debouncedSearchTerm } = useImageGalleryContext()

    const images = useAppSelector(getAllPhotos)
    const dispatch = useDispatch()

    const { isFetching } = useGetSearchedImagesQuery({ page, searchTerm: debouncedSearchTerm }, {
        skip: !debouncedSearchTerm
    })

    useEffect(() => {
        if (debouncedSearchTerm) {
            setPage(1)
            dispatch(resetPhotos())
        }
    }, [debouncedSearchTerm, dispatch, setPage])


    const handleIntersection = useCallback((inView: unknown) => {
        if (inView && !isFetching) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [isFetching, setPage]);

    const { ref } = useInView({
        onChange: handleIntersection,
        threshold: 1.0,
    });


    const getPlaceHolderScreen = () => {
        if (!debouncedSearchTerm) {
            return null
        } else if (!isFetching && !images.length) {
            return <div className='center-content'>No Results Found</div>
        }
        return null
    }

    console.log('images', images)
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
                <div ref={ref} className="trigger-div"></div>
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
    )
}