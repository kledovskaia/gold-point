import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { useDifference } from '../hooks/useDifference';
import { fetchLastNDays } from '../redux/thunks';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import Spinner from '../components/Spinner';

const controlTypes = ['date', 'price', 'difference'];

const Currency = ({ lastNDays, fetchLastNDays }) => {
  const navigate = useNavigate();
  const { currency } = useParams();
  const [currencyList, setCurrencyList] = useState();
  const { highestIncrease, lowestDecrease } = useDifference(currencyList);

  useEffect(() => {
    if (!lastNDays) fetchLastNDays();
  }, [currency]);

  useEffect(() => {
    if (!lastNDays) return;
    setCurrencyList(
      Object.entries(lastNDays).map(([key, value]) => ({
        ...(value ? value[currency] : {}),
        Date: `${new Date(key).getDate().toString().padStart(2, '0')}.${(
          new Date(key).getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}`,
      }))
    );
  }, [lastNDays]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.document.addEventListener('keydown', handleKeyDown);
    return () => window.document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOutsideClick = useCallback(() => navigate('/'), []);
  const handleInsideClick = useCallback((e) => e.stopPropagation(), []);

  const handleSort = () => {};

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
  lastNDays: PropTypes.object,
};

const mapStateToProps = (state) => ({
  lastNDays: state.currency.lastNDays,
});
const actions = {
  fetchLastNDays,
};

export default connect(mapStateToProps, actions)(Currency);
