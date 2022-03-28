import { calcCurrencyData } from './calcCurrencyData';

export const calcDifferences = (dataList) => {
  const currencyDifferences = dataList?.map((currency) => {
    if (!currency.Value) return 0;
    const { difference } = calcCurrencyData(currency);
    return difference;
  });

  const highestIncrease =
    currencyDifferences && Math.max(...currencyDifferences);
  const lowestDecrease =
    currencyDifferences && Math.min(...currencyDifferences);

  return { highestIncrease, lowestDecrease };
};
