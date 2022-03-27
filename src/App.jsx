import { connect } from 'react-redux';
import { fetchDaily, fetchLastNDays } from './redux/thunks.js';
import { Route, Routes } from 'react-router-dom';
import * as routes from './constants/routes';
import Currency from './pages/Currency';
import Home from './pages/Home';
import { useEffect } from 'react';

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

const actions = {
  fetchLastNDays,
  fetchDaily,
};

export default connect(null, actions)(App);
