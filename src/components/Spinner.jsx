import { memo } from 'react';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <svg
        className="spinner spinner-animation"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="circle circle-animation" cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
};

export default memo(Spinner);
