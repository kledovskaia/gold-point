import ChevronUp from '../assets/chevron-up.svg';

const CurrencyInfo = ({ currency, lowestDecrease, highestIncrease }) => {
  const prev = currency.Previous / currency.Nominal;
  const curr = currency.Value / currency.Nominal;
  const diff = (-(prev - curr) * 100) / prev;

  return (
    <section
      style={{
        backgroundColor: diff
          ? diff > 0
            ? `rgba(0, 175 , 0, ${diff / highestIncrease})`
            : `rgba(255, 0, 0, ${diff / lowestDecrease})`
          : 'none',
      }}
      className={`currency ${
        diff ? `currency--${diff > 0 ? 'increase' : 'decrease'}` : ''
      } currency-list__item`}
    >
      <div className="currency__name">{currency.CharCode}</div>
      <div className="currency__curr">{curr.toFixed(2)}</div>
      <div className="currency__diff">
        <img className="currency__icon" src={ChevronUp} alt="" />
        <div>
          <span>{Math.abs(diff.toFixed(2)).toString().padEnd(4, '0')}%</span>
        </div>
      </div>
    </section>
  );
};

export default CurrencyInfo;
