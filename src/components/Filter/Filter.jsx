import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <label className={css.filter__label}>
    Find contacts by name
    <input
      className={css.filter__input}
      type="text"
      value={value}
      onChange={onChange}
    ></input>
  </label>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
