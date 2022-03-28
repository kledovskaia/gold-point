import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { calcCurrencyData } from '../helpers/calcCurrencyData';
import { sortBy } from '../helpers/sortBy';
import { setSort } from '../redux/slices/sort';
import { Link } from 'react-router-dom';

const Home = ({ dataList, setSort, sortType, sortOrder }) => {
  const [currencyList, setCurrencyList] = useState(Object.values(dataList));

  useEffect(() => {
    setCurrencyList(Object.values(dataList));
  }, [dataList]);

  useEffect(() => {
    setCurrencyList(
      [...Object.values(dataList)].sort(sortBy[sortType](sortOrder))
    );
  }, [sortOrder, sortType, dataList]);

  const currencyDifferences = useMemo(
    () =>
      Object.values(dataList).map((currency) => {
        const { difference } = calcCurrencyData(currency);
        return difference;
      }),
    [dataList]
  );

  const highestIncrease = useMemo(
    () => Math.max(...currencyDifferences),
    [currencyDifferences]
  );
  const lowestDecrease = useMemo(
    () => Math.min(...currencyDifferences),
    [currencyDifferences]
  );

  const handleSort = useCallback((type) => {
    setSort(type);
  }, []);

  return (
    <>
      <Controls handleSort={handleSort} />
      <section className="currency-list">
        {currencyList?.map((item) => {
          return (
            <CurrencyInfo
              type="link"
              key={item.CharCode}
              lowestDecrease={lowestDecrease}
              highestIncrease={highestIncrease}
              currency={item}
            />
          );
        })}
      </section>
    </>
  );
};

Home.propTypes = {
  dataList: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  dataList: state.currency.today,
  sortType: state.sort.type,
  sortOrder: state.sort.order,
});
const actions = {
  setSort,
};

export default connect(mapStateToProps, actions)(memo(Home));
