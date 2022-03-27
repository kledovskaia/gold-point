import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';

const sortBy = {
  name: (order) => (a, b) => {
    if (order === 'asc') {
      return a.CharCode > b.CharCode ? 1 : -1;
    } else if (order === 'desc') {
      return a.CharCode < b.CharCode ? 1 : -1;
    }
  },
  price: (order) => (a, b) => {
    const priceA = a.Value / a.Nominal;
    const priceB = b.Value / b.Nominal;

    if (order === 'asc') {
      return priceA > priceB ? 1 : -1;
    } else if (order === 'desc') {
      return priceA < priceB ? 1 : -1;
    }
  },
  difference: (order) => (a, b) => {
    const prevA = a.Previous / a.Nominal;
    const currA = a.Value / a.Nominal;
    const diffA = (-(prevA - currA) * 100) / prevA;
    const prevB = b.Previous / b.Nominal;
    const currB = b.Value / b.Nominal;
    const diffB = (-(prevB - currB) * 100) / prevB;

    if (order === 'asc') {
      return diffA > diffB ? 1 : -1;
    } else if (order === 'desc') {
      return diffA < diffB ? 1 : -1;
    }
  },
};

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
  }, [sort]);

  const currencyDiff = useMemo(
    () =>
      Object.values(dataList).map((item) => {
        const prev = item.Previous / item.Nominal;
        const curr = item.Value / item.Nominal;
        const diff = (-(prev - curr) * 100) / prev;
        return diff;
      }),
    [dataList]
  );

  const highestIncrease = useMemo(
    () => Math.max(...currencyDiff),
    [currencyDiff]
  );
  const lowestDecrease = useMemo(
    () => Math.min(...currencyDiff),
    [currencyDiff]
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
        {currencyList &&
          currencyList.map((item) => {
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

const mapStateToProps = (state) => ({
  dataList: state.currency.today,
});

export default connect(mapStateToProps)(memo(Home));
