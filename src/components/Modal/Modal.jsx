import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ imgModal, closeModal }) => {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }
    const handleClick = event => {
      if (event.target.nodeName !== 'IMG') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  },[closeModal]);

  return (
    <div className={s.Overlay}>
      <div className={s.Modal}>
        <img src={imgModal.largeImageURL} alt={imgModal.tags} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  imgModal: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  closeModal: PropTypes.func.isRequired,
};

export default Modal;