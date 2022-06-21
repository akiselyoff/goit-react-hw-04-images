import { useState } from 'react'
import PropTypes from 'prop-types';
import { BiSearchAlt2 } from 'react-icons/bi';
import s from './Searchbar.module.css';

const Searchbar= ({onSubmit})=> {

    const [query, setQuery] = useState('');

    const queryChange = evt => {
      setQuery(evt.currentTarget.value.toLowerCase());
   
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      alert('Enter your query');
      return;
    }

    onSubmit(query);
  };

  
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <BiSearchAlt2 style={{ margin: '7px auto' }} />
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={queryChange}
          />
        </form>
      </header>
    );
  
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;