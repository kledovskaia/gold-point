import React from 'react';

const Controls = ({ handleSort }) => {
  const handleClick = (e) => {
    handleSort(e.target.name);
  };

  return (
    <div>
      <button onClick={handleClick} name="name">
        Name
      </button>
      <button onClick={handleClick} name="price">
        Price
      </button>
      <button onClick={handleClick} name="difference">
        Difference
      </button>
    </div>
  );
};

export default Controls;
