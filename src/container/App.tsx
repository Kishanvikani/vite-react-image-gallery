import { Header } from '../components/Header/Header';
import { ImageGrid } from '../components/ImageGrid/ImageGrid';
import { ImageModal } from '../components/ImageModal/ImageModal';
import { SearchInput } from '../components/SearchInput/SearchInput';
import { ImageGalleryProvider } from '../context/ImageGalleryContext';
import { useImageGalleryContext } from '../hooks/useImageGalleryContext';
import './style.css';

const App = () => {
  const { imageId, setImageId } = useImageGalleryContext()

  return (
    <>
      <div className='container'>
        <header className='header'>
          <Header />
          <SearchInput />
        </header>
        <ImageGrid />
      </div>

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

export default function ImageGalleryContextWrappedApp() {
  return (
    <ImageGalleryProvider>
      <App />
    </ImageGalleryProvider>
  )
}