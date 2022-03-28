import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronUpIcon } from '../assets/chevron-up.svg';
import { calcCurrencyData } from '../helpers/calcCurrencyData';

const CurrencyInfo = ({ type, currency, lowestDecrease, highestIncrease }) => {
  const { price, difference } = calcCurrencyData(currency);

  const content = (
    <section
      style={{
        backgroundColor: difference
          ? difference > 0
            ? `rgba(0, 175 , 0, ${difference / highestIncrease})`
            : `rgba(255, 0, 0, ${difference / lowestDecrease})`
          : 'none',
      }}
      className={`currency ${
        difference
          ? `currency--${difference > 0 ? 'increase' : 'decrease'}`
          : ''
      } currency-list__item`}
    >
      <div className="currency__name">{currency.CharCode}</div>
      <div className="currency__curr">{price.toFixed(2)}</div>
      <div className="currency__difference">
        <ChevronUpIcon />
        <div>
          <span>
            {Math.abs(difference.toFixed(2)).toString().padEnd(4, '0')}%
          </span>
        </div>
      </div>
    </section>
  );

  return type === 'link' ? (
    <Link className="link" to={`/${currency.CharCode}`}>
      {content}
    </Link>
  ) : (
    content
  );
};

CurrencyInfo.propTypes = {
  type: PropTypes.string,
  currency: PropTypes.object.isRequired,
  lowestDecrease: PropTypes.number.isRequired,
  highestIncrease: PropTypes.number.isRequired,
};

export default memo(CurrencyInfo);
