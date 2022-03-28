import PropTypes from 'prop-types';
import Button from './Button';
import Sort from '../assets/sort.svg';
import { memo, useCallback } from 'react';

const types = ['name', 'price', 'difference'];

const Controls = ({ handleSort }) => {
  const handleClick = useCallback((e) => {
    const { name } = e.target.closest('button');
    handleSort(name);
  }, []);

  return (
    <section className="controls">
      {types.map((name) => (
        <Button
          key={name}
          className="controls__button"
          onClick={handleClick}
          name={name}
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
