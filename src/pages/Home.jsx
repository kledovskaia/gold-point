import { memo } from 'react';
import { connect } from 'react-redux';

const Home = ({ items }) => {
  console.log(items);
  return (
    <ul>
      {Object.values(items).map((item) => {
        const prev = (item.Previous / item.Nominal).toFixed(2);
        const curr = (item.Value / item.Nominal).toFixed(2);
        const diff = (((curr - prev) / curr) * 100).toFixed(2);

        return (
          <li key={item.CharCode}>
            {item.CharCode} | {curr} | {diff}%
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  items: state.currency.today,
});

export default connect(mapStateToProps)(memo(Home));
