import { useMemo } from 'react';
import { calcCurrencyData } from '../helpers/calcCurrencyData';

export const useDifference = (dataList) => {
  const currencyDifferences = useMemo(
    () =>
      dataList &&
      dataList.map((currency) => {
        if (!currency.Value) return 0;
        const { difference } = calcCurrencyData(currency);
        return difference;
      }),
    [dataList]
  );

  const highestIncrease = useMemo(
    () => currencyDifferences && Math.max(...currencyDifferences),
    [currencyDifferences]
  );
  const lowestDecrease = useMemo(
    () => currencyDifferences && Math.min(...currencyDifferences),
    [currencyDifferences]
  );

  return { highestIncrease, lowestDecrease };
};
