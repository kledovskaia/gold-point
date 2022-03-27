export const calcCurrencyData = (currency) => {
  const previousPrice = currency.Previous / currency.Nominal;
  const currentPrice = currency.Value / currency.Nominal;
  const difference = (-(previousPrice - currentPrice) * 100) / previousPrice;
  return { price: currentPrice, difference };
};
