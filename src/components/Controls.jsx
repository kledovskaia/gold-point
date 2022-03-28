import PropTypes from 'prop-types';
import Button from './Button';
import { ReactComponent as SortIcon } from '../assets/sort.svg';
import { memo, useCallback } from 'react';

const Controls = ({ types, handleSort }) => {
  const handleClick = useCallback(
    (e) => {
      const { name } = e.target.closest('button');
      handleSort(name);
    },
    [handleSort]
  );

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
          <SortIcon />
        </Button>
      ))}
    </section>
  );
};

Controls.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string),
  handleSort: PropTypes.func.isRequired,
};

export default memo(Controls);
