import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      Load More
    </button>
  );
};

Button.prototype = {
  onClick: PropTypes.func.isRequired,
};

export default Button;