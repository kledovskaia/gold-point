import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Currency from './containers/Currency';
import Home from './containers/Home';
import { fetchDaily } from './redux/thunks.js';
import Spinner from './components/Spinner';

const App = ({ areDailyCurrenciesLoaded, fetchDaily }) => {
  useEffect(() => {
    fetchDaily();
  }, []);

  return (
    <>
      <main className="main">
        {!areDailyCurrenciesLoaded && <Spinner />}
        {areDailyCurrenciesLoaded && (
          <>
            <Home />
            <Currency />
          </>
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
  areDailyCurrenciesLoaded: !!state.currency.today,
});

const actions = {
  fetchDaily,
};

export default connect(mapStateToProps, actions)(App);
