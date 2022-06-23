import { useState, useEffect } from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LoaderSpinner from './LoaderSpinner/LoaderSpinner';
import fetchGallery from '../services/fetchAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryError from './ImageGallery/ImageGalleryError';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModalImg, setDataModalImg] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) { return };
    setStatus('pending');

    
      fetchGallery
        .fetchAPI(query, page)
        .then(gallery => {
          setGallery(prev => prev = [...prev, ...gallery.hits]);
          setTotal(gallery.total);
          setStatus('resolved');

          setTimeout(()=>{window.scrollBy({
            top: document.body.clientHeight,
            behavior: 'smooth',
          });},100)
          
          
        })
        .catch(error => {
          
          setStatus('rejected');
          setError(error);
          
          
        });
    
     
    
  }, [query, page])

  

  const handleFormSubmit = searchbarQuery => {
    if (searchbarQuery !== query) {
      setQuery(query => query = searchbarQuery);
      setGallery([]);
      setPage(1); 
    }
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const onImageClick = evt => {
    if (evt.target.nodeName === 'IMG') {
      const imgId = Number(evt.target.attributes.id.value);

      gallery.forEach(item => {
        const itemId = Number(item.id);

        if (itemId === imgId) {
          setDataModalImg(item);
          setIsModalOpen(true);
        
        }
      });
    }
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idle' && <h1>Enter your query</h1>}
        {status === 'pending' && <LoaderSpinner />}

        {status === 'resolved' && (
          <ImageGallery gallery={gallery} onImageClick={onImageClick} />
        )}

      {status === 'rejected' && <ImageGalleryError message={error.message} />}
      {status === 'resolved' && gallery.length === 0 && <h1>Your query not found</h1>}
        {status === 'resolved' &&
          gallery.length > 0 &&
          gallery.length < total && <Button onClick={handleLoadMore} />}
        {isModalOpen && (
          <Modal
            imgModal={dataModalImg}
            closeModal={closeModal}
          />
        )}
      </>
  );
};
