import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { sortBy } from '../helpers/sortBy';
import { setDailySort } from '../redux/slices/sort';
import { setSelectedCurrency } from '../redux/slices/currency';
import { calcDifferences } from '../helpers/calcDifferences';

const controlTypes = ['name', 'price', 'difference'];

const Home = ({
  dataList,
  setSort,
  sortType,
  sortOrder,
  setSelectedCurrency,
}) => {
  const { highestIncrease, lowestDecrease } = useMemo(
    () => dataList && calcDifferences(Object.values(dataList)),
    [dataList]
  );
  const [currencyList, setCurrencyList] = useState(
    [...Object.values(dataList)].sort(sortBy[sortType](sortOrder))
  );

  useEffect(() => {
    setCurrencyList(
      [...Object.values(dataList)].sort(sortBy[sortType](sortOrder))
    );
  }, [sortOrder, sortType, dataList]);

  const handleSort = useCallback(
    (type) => {
      setSort(type);
    },
    [setSort]
  );

  return (
    <>
      <Controls types={controlTypes} handleSort={handleSort} />
      <section className="currency-list currency-list--interactive">
        {currencyList.map((item) => (
          <CurrencyInfo
            key={item.CharCode}
            setSelectedCurrency={setSelectedCurrency}
            lowestDecrease={lowestDecrease}
            highestIncrease={highestIncrease}
            currency={item}
          />
        ))}
      </section>
    </>
  );
};

Home.propTypes = {
  dataList: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSelectedCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dataList: state.currency.today,
  sortType: state.sort.daily.type,
  sortOrder: state.sort.daily.order,
});
const actions = {
  setSort: setDailySort,
  setSelectedCurrency,
};

export default connect(mapStateToProps, actions)(memo(Home));
