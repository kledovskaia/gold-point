export const sortBy = {
  name: (order) => (a, b) => {
    if (order === 'asc') {
      return a.CharCode > b.CharCode ? 1 : -1;
    } else if (order === 'desc') {
      return a.CharCode < b.CharCode ? 1 : -1;
    }
  },
  price: (order) => (a, b) => {
    const priceA = a.Value / a.Nominal;
    const priceB = b.Value / b.Nominal;

    if (order === 'asc') {
      return priceA > priceB ? 1 : -1;
    } else if (order === 'desc') {
      return priceA < priceB ? 1 : -1;
    }
  },
  difference: (order) => (a, b) => {
    const prevA = a.Previous / a.Nominal;
    const currA = a.Value / a.Nominal;
    const diffA = (-(prevA - currA) * 100) / prevA;
    const prevB = b.Previous / b.Nominal;
    const currB = b.Value / b.Nominal;
    const diffB = (-(prevB - currB) * 100) / prevB;

    if (order === 'asc') {
      return diffA > diffB ? 1 : -1;
    } else if (order === 'desc') {
      return diffA < diffB ? 1 : -1;
    }
  },
};
