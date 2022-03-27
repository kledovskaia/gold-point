import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import Currency from './pages/Currency';
import Home from './pages/Home';
import * as routes from './constants/routes';
import { fetchDaily, fetchLastNDays } from './redux/thunks.js';

const App = ({ fetchLastNDays, fetchDaily }) => {
  useEffect(() => {
    fetchDaily();
    fetchLastNDays();
  }, []);

  return (
    <main className="main">
      <Routes>
        <Route path={routes.CURRENCY} element={<Currency />} />
        <Route path={routes.HOME} element={<Home />} />
      </Routes>
    </main>
  );
};

App.propTypes = {
  fetchLastNDays: PropTypes.func.isRequired,
  fetchDaily: PropTypes.func.isRequired,
};

const actions = {
  fetchLastNDays,
  fetchDaily,
};

export default connect(null, actions)(App);
