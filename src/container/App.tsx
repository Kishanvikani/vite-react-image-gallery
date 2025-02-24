import { Header } from '../components/Header/Header';
import { ImageGrid } from '../components/ImageGrid/ImageGrid';
import { SearchInput } from '../components/SearchInput/SearchInput';
import { ImageGalleryProvider } from '../context/ImageGalleryContext';
import './style.css';

export const App = () => {

  return (
    <ImageGalleryProvider>
      <div className='container'>
        <header className='header'>
          <Header />
          <SearchInput />
        </header>
        <ImageGrid />
      </div>
    </ImageGalleryProvider>
  )
}