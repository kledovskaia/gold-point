import { connect } from 'react-redux';
import { fetchLastNDays } from './redux/thunks.js';
import { Route, Routes } from 'react-router-dom';
import * as routes from './constants/routes';
import Currency from './pages/Currency';
import Home from './pages/Home';
import { useEffect } from 'react';

const App = ({ fetchLastNDays }) => {
  useEffect(() => {
    fetchLastNDays();
  }, []);

  return (
    <Routes>
      <Route path={routes.CURRENCY} element={<Currency />} />
      <Route path={routes.HOME} element={<Home />} />
    </Routes>
  );
};

const actions = {
  fetchLastNDays,
};

export default connect(null, actions)(App);
