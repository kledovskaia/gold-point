import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchLastNDays } from '../redux/thunks';
import { setLastNDaysSort } from '../redux/slices/sort';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import Spinner from '../components/Spinner';
import { sortBy } from '../helpers/sortBy';
import Button from '../components/Button';
import { setSelectedCurrency } from '../redux/slices/currency';
import { getCurrenciesByCharCodeFrom } from '../helpers/selectByCharCodeFrom';
import { calcDifferences } from '../helpers/calcDifferences';

const controlTypes = ['date', 'price', 'difference'];

const Currency = ({
  lastNDays,
  fetchLastNDays,
  setSort,
  sortType,
  sortOrder,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const [currencyList, setCurrencyList] = useState();
  const { highestIncrease, lowestDecrease } = calcDifferences(
    getCurrenciesByCharCodeFrom(selectedCurrency, lastNDays)
  );

  useEffect(() => {
    if (!selectedCurrency) return;
    if (!lastNDays) fetchLastNDays();
  }, [selectedCurrency, lastNDays, fetchLastNDays]);

  useEffect(() => {
    if (!lastNDays) return;
    if (!selectedCurrency) {
      setCurrencyList(null);
      return;
    }
    setCurrencyList((state) => {
      const list =
        state ?? getCurrenciesByCharCodeFrom(selectedCurrency, lastNDays) ?? [];
      return [...list].sort(sortBy[sortType](sortOrder));
    });
  }, [lastNDays, sortType, sortOrder, selectedCurrency]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCurrency(null);
    };
    window.document.addEventListener('keydown', handleKeyDown);
    return () => window.document.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedCurrency]);

  const handleClose = useCallback(
    () => setSelectedCurrency(null),
    [setSelectedCurrency]
  );
  const handleInsideClick = useCallback((e) => e.stopPropagation(), []);

  const handleSort = useCallback(
    (type) => {
      setSort(type);
    },
    [setSort]
  );

  if (!selectedCurrency) return null;

  return (
    <div className="overlay popup-container" onClick={handleClose}>
      <div className="popup" onClick={handleInsideClick}>
        {!lastNDays && !selectedCurrency && <Spinner />}
        {lastNDays && (
          <>
            <Button onClick={handleClose} className="popup__close">
              <CloseIcon />
            </Button>
            <div className="popup__content">
              <Controls types={controlTypes} handleSort={handleSort} />
              <section className="currency-list currency-list--popup">
                {currencyList?.map((item) => (
                  <CurrencyInfo
                    key={item.Date}
                    lowestDecrease={lowestDecrease}
                    highestIncrease={highestIncrease}
                    currency={item}
                  />
                ))}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Currency.propTypes = {
  fetchLastNDays: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  lastNDays: PropTypes.object,
};

const mapStateToProps = (state) => ({
  lastNDays: state.currency.lastNDays,
  sortType: state.sort.lastNDays.type,
  sortOrder: state.sort.lastNDays.order,
  selectedCurrency: state.currency.selectedCurrency,
});
const actions = {
  fetchLastNDays,
  setSort: setLastNDaysSort,
  setSelectedCurrency,
};

export default connect(mapStateToProps, actions)(Currency);
