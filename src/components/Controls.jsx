import PropTypes from 'prop-types';
import Button from './Button';
import Sort from '../assets/sort.svg';
import { memo } from 'react';

const types = ['name', 'price', 'difference'];

const Controls = ({ handleSort }) => {
  return (
    <section className="controls">
      {types.map((name) => (
        <Button
          key={name}
          className="controls__button"
          onClick={() => handleSort(name)}
        >
          <span>{name[0].toUpperCase() + name.slice(1)}</span>
          <img src={Sort} alt="" />
        </Button>
      ))}
    </section>
  );
};

Controls.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default memo(Controls);
