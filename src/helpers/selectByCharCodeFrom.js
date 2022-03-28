export const getCurrenciesByCharCodeFrom = (selectedCurrency, lastNDays) => {
  return (
    lastNDays &&
    Object.entries(lastNDays).map(([key, value]) => ({
      ...(value ? value[selectedCurrency] : {}),
      Date: `${new Date(key).getDate().toString().padStart(2, '0')}.${(
        new Date(key).getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}`,
    }))
  );
};
