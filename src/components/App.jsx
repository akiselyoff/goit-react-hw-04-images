import { useState, useEffect } from 'react'
import fetchGallery from '..services/fetchAPI';


export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setStatus(status => status = 'pending');

    
      fetchGallery
        .fetchAPI(query, page)
        .then(gallery => {
          setGallery(gallery => gallery = [...gallery, ...gallery.hits]);
          setTotal(total => total = gallery.total);
          setStatus(status => status = 'resolved');
        })
        .catch(error => setError(error=>error = 'rejected'));
  }, [query, page])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};
