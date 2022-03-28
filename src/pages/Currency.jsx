import { memo, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CurrencyInfo from '../components/CurrencyInfo';
import { calcCurrencyData } from '../helpers/calcCurrencyData';
import { fetchLastNDays } from '../redux/thunks';

const Currency = ({ lastNDays, fetchLastNDays }) => {
  const { currency } = useParams();

  useEffect(() => {
    if (!lastNDays) fetchLastNDays();
  }, [currency, lastNDays]);

  if (!currency) return null;

  return <></>;
};

const mapStateToProps = (state) => ({
  lastNDays: state.currency.lastNDays,
});
const actions = {
  fetchLastNDays,
};

export default connect(mapStateToProps, actions)(memo(Currency));
