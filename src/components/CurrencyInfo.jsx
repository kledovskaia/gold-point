import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { ReactComponent as ChevronUpIcon } from '../assets/chevron-up.svg';
import { calcCurrencyData } from '../helpers/calcCurrencyData';

const CurrencyInfo = ({
  currency,
  lowestDecrease,
  highestIncrease,
  setSelectedCurrency,
}) => {
  const { price, difference } = calcCurrencyData(currency);

  const handleClick = useCallback(() => {
    setSelectedCurrency?.(currency.CharCode);
  }, [setSelectedCurrency, currency]);

  return (
    <section
      onClick={handleClick}
      title={currency.Name}
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
      <div className="currency__name">{currency.Date || currency.CharCode}</div>
      <div className="currency__curr">{price ? price.toFixed(2) : 'n/a'}</div>
      <div className="currency__difference">
        <ChevronUpIcon />
        <div>
          {!difference && <span>n/a</span>}
          {!!difference && (
            <span>
              {!difference ? 'n/a' : Math.abs(difference.toFixed(2)) + '%'}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

CurrencyInfo.propTypes = {
  currency: PropTypes.object.isRequired,
  lowestDecrease: PropTypes.number.isRequired,
  highestIncrease: PropTypes.number.isRequired,
  setSelectedCurrency: PropTypes.func,
};

export default memo(CurrencyInfo);
