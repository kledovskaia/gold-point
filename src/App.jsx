import { connect } from 'react-redux';
import { fetchDaily, fetchLastNDays } from './redux/thunks.js';
import { Route, Routes } from 'react-router-dom';
import * as routes from './constants/routes';
import Currency from './pages/Currency';
import Home from './pages/Home';
import { useEffect } from 'react';

const App = ({ fetchDaily, fetchLastNDays, currency }) => {
  useEffect(() => {
    fetchLastNDays();
  }, []);

  useEffect(() => {
    console.log(currency);
  }, [currency]);

  return (
    <Routes>
      <Route path={routes.CURRENCY} element={<Currency />} />
      <Route path={routes.HOME} element={<Home />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  currency: state.currency,
});

const actions = {
  fetchDaily,
  fetchLastNDays,
};

export default connect(mapStateToProps, actions)(App);
