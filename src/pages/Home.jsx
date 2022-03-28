import { memo, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Controls from '../components/Controls';
import CurrencyInfo from '../components/CurrencyInfo';
import { sortBy } from '../helpers/sortBy';
import { setDailySort, setSort } from '../redux/slices/sort';
import { useDifference } from '../hooks/useDifference';

const controlTypes = ['name', 'price', 'difference'];

const Home = ({ children, dataList, setSort, sortType, sortOrder }) => {
  const { highestIncrease, lowestDecrease } = useDifference(
    Object.values(dataList)
  );
  const [currencyList, setCurrencyList] = useState(
    [...Object.values(dataList)].sort(sortBy[sortType](sortOrder))
  );

  useEffect(() => {
    setCurrencyList(
      [...Object.values(dataList)].sort(sortBy[sortType](sortOrder))
    );
  }, [sortOrder, sortType, dataList]);

  const handleSort = useCallback((type) => {
    setSort(type);
  }, []);

  return (
    <>
      {children}
      <Controls types={controlTypes} handleSort={handleSort} />
      <section className="currency-list">
        {currencyList.map((item) => (
          <CurrencyInfo
            type="link"
            key={item.CharCode}
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
};

const mapStateToProps = (state) => ({
  dataList: state.currency.today,
  sortType: state.sort.daily.type,
  sortOrder: state.sort.daily.order,
});
const actions = {
  setSort: setDailySort,
};

export default connect(mapStateToProps, actions)(memo(Home));
