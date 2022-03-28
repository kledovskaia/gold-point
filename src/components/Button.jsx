import classNames from 'classnames';
import { memo } from 'react';

const Button = ({ children, className, ...restProps }) => {
  return (
    <button className={classNames('button', className)} {...restProps}>
      {children}
    </button>
  );
};

export default memo(Button);
