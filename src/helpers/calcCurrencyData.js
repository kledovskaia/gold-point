export const calcCurrencyData = (currency) => {
  const previousPrice = currency.Previous / currency.Nominal;
  const currentPrice = currency.Value / currency.Nominal;
  const difference = (currentPrice / previousPrice - 1) * 100;
  return { price: currentPrice, difference };
};
