import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { calcCurrencyData } from '../helpers/calcCurrencyData';
import { sortBy } from '../helpers/sortBy';

const Home = ({ dataList }) => {
  const [currencyList, setCurrencyList] = useState(Object.values(dataList));
  const [sort, setSort] = useState(null);

  useEffect(() => {
    setCurrencyList(Object.values(dataList));
  }, [dataList]);

  useEffect(() => {
    if (sort) {
      const [type, order] = sort.split('-');
      setCurrencyList([...Object.values(dataList)].sort(sortBy[type](order)));
    }
  }, [sort, dataList]);

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

  const handleSort = useCallback(
    (type) => {
      if (sort) {
        const [currentType, currentOrder] = sort.split('-');
        setSort(
          `${type}-${
            type === currentType && currentOrder === 'asc' ? 'desc' : 'asc'
          }`
        );
      } else {
        setSort(`${type}-asc`);
      }
    },
    [sort]
  );

  return (
    <>
      <Controls handleSort={handleSort} />
      <section className="currency-list">
        {currencyList?.map((item) => {
          return (
            <CurrencyInfo
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
};

const mapStateToProps = (state) => ({
  dataList: state.currency.today,
});

export default connect(mapStateToProps)(memo(Home));
