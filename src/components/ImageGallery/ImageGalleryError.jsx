import PropTypes from 'prop-types';

const ImageGalleryError = ({ message }) => {
  return <h1>{message}</h1>;
}

ImageGalleryError.propTypes = {
  message: PropTypes.string.isRequired,
};


export default ImageGalleryError;