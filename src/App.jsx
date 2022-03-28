import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import Currency from './pages/Currency';
import Home from './pages/Home';
import * as routes from './constants/routes';
import { fetchDaily } from './redux/thunks.js';
import Spinner from './components/Spinner';

const App = ({ isDailyCurrenciesLoaded, fetchDaily }) => {
  useEffect(() => {
    fetchDaily();
  }, []);

  return (
    <>
      <main className="main">
        {!isDailyCurrenciesLoaded && <Spinner />}
        {isDailyCurrenciesLoaded && (
          <Home>
            <Routes>
              <Route path={routes.CURRENCY} element={<Currency />} />
            </Routes>
          </Home>
        )}
      </main>
    </>
  );
};

App.propTypes = {
  fetchDaily: PropTypes.func.isRequired,
  isDailyCurrenciesLoaded: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isDailyCurrenciesLoaded: !!state.currency.today,
});

const actions = {
  fetchDaily,
};

export default connect(mapStateToProps, actions)(App);
