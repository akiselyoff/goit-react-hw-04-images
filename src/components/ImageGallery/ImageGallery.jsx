import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery=({gallery, onImageClick}) =>{
  
    return (
      <ul className={s.ImageGallery}>
        {gallery.map(galleryItem => {
          return (
            <ImageGalleryItem
              onImageClick={onImageClick}
              key={galleryItem.id}
              galleryItem={galleryItem}
            />
          );
        })}
      </ul>
    );
  
}
ImageGallery.propTypes = {
  galleryItem: PropTypes.shape({ id: PropTypes.number.isRequired }),
};

export default ImageGallery;
