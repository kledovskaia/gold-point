import { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchLastNDays } from '../redux/thunks';

const Currency = ({ lastNDays, fetchLastNDays }) => {
  const { currency } = useParams();

  useEffect(() => {
    if (!lastNDays) fetchLastNDays();
  }, [currency, lastNDays]);

  return lastNDays && <div>Do the logic</div>;
};

const mapStateToProps = (state) => ({
  lastNDays: state.currency.lastNDays,
});
const actions = {
  fetchLastNDays,
};

export default connect(mapStateToProps, actions)(memo(Currency));
