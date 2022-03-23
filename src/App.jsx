import { Route, Routes } from 'react-router-dom';
import * as routes from './constants/routes';
import Currency from './pages/Currency';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path={routes.CURRENCY} element={<Currency />} />
      <Route path={routes.HOME} element={<Home />} />
    </Routes>
  );
};

export default App;
