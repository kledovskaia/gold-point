import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchLastNDays } from '../redux/thunks';
import { setLastNDaysSort } from '../redux/slices/sort';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { useDifference } from '../hooks/useDifference';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import Spinner from '../components/Spinner';
import { sortBy } from '../helpers/sortBy';

const controlTypes = ['date', 'price', 'difference'];

const Currency = ({
  lastNDays,
  fetchLastNDays,
  setSort,
  sortType,
  sortOrder,
}) => {
  const navigate = useNavigate();
  const { currency } = useParams();
  const [currencyList, setCurrencyList] = useState();
  const { highestIncrease, lowestDecrease } = useDifference(currencyList);

  useEffect(() => {
    if (!lastNDays) fetchLastNDays();
  }, [currency]);

  useEffect(() => {
    if (!lastNDays) return;
    setCurrencyList((state) => {
      const list =
        state ??
        Object.entries(lastNDays).map(([key, value]) => ({
          ...(value ? value[currency] : {}),
          Date: `${new Date(key).getDate().toString().padStart(2, '0')}.${(
            new Date(key).getMonth() + 1
          )
            .toString()
            .padStart(2, '0')}`,
        }));
      return [...list].sort(sortBy[sortType](sortOrder));
    });
  }, [lastNDays, sortType, sortOrder, currency]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.document.addEventListener('keydown', handleKeyDown);
    return () => window.document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOutsideClick = useCallback(() => navigate('/'), []);
  const handleInsideClick = useCallback((e) => e.stopPropagation(), []);

  const handleSort = useCallback((type) => {
    setSort(type);
  }, []);

  return (
    <div className="overlay popup-container" onClick={handleOutsideClick}>
      <div className="popup" onClick={handleInsideClick}>
        {!lastNDays && <Spinner />}
        {lastNDays && (
          <>
            <Link className="popup__close" to="/">
              <CloseIcon />
            </Link>
            <Controls types={controlTypes} handleSort={handleSort} />
            <section className="currency-list">
              {currencyList?.map((item) => (
                <CurrencyInfo
                  key={item.Date}
                  lowestDecrease={lowestDecrease}
                  highestIncrease={highestIncrease}
                  currency={item}
                />
              ))}
            </section>
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
});
const actions = {
  fetchLastNDays,
  setSort: setLastNDaysSort,
};

export default connect(mapStateToProps, actions)(Currency);
