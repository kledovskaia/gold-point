import { useMemo } from 'react';
import { calcCurrencyData } from '../helpers/calcCurrencyData';

export const useDifference = (dataList) => {
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

  return { highestIncrease, lowestDecrease };
};
