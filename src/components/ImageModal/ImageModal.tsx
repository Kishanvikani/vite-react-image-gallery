import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { useGetImageDetailsQuery } from '../../api/photo.api.slice';
import { Loader } from '../Loader/Loader';
import './style.css';

type ImageModalProps = {
    open: boolean;
    onClose: () => void;
    imageId: string;
}

export const ImageModal = ({ open, onClose, imageId = "" }: ImageModalProps) => {

    const { data: image, isFetching } = useGetImageDetailsQuery(imageId, { skip: !imageId });

    return (
        <Modal open={open} onClose={onClose} showCloseIcon={false} center>
            <div className="custom-modal">
                <Loader isLoading={isFetching}>
                    <article className='full-image'>
                        {image && (
                            <img
                                src={image.urls.regular}
                                alt={image.alt_description}
                                height="100%"
                                width="100%"
                                style={{ objectFit: 'cover' }}
                                loading="lazy"
                            />
                        )}
                    </article>
                </Loader>
            </div>
        </Modal>
    )
}