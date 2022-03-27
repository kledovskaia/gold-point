import PropTypes from 'prop-types';

const Controls = ({ handleSort }) => {
  const handleClick = (e) => {
    handleSort(e.target.name);
  };

  return (
    <section className="controls">
      <button className="controls__button" onClick={handleClick} name="name">
        Name
      </button>
      <button className="controls__button" onClick={handleClick} name="price">
        Price
      </button>
      <button
        className="controls__button"
        onClick={handleClick}
        name="difference"
      >
        Difference
      </button>
    </section>
  );
};

Controls.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default Controls;
