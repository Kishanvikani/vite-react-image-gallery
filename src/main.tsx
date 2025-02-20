import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import ImageGalleryContextWrappedApp from './container/App.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <ImageGalleryContextWrappedApp />
    </StrictMode>
  </Provider>,
)
