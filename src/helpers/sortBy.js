export const sortBy = {
  date: (order) => (a, b) => {
    const year = new Date().getFullYear();
    const [dayA, monthA] = a.Date.split('.');
    const [dayB, monthB] = b.Date.split('.');
    if (order === 'asc') {
      return (
        new Date(year, monthA - 1, dayA) - new Date(year, monthB - 1, dayB)
      );
    } else if (order === 'desc') {
      return (
        new Date(year, monthB - 1, dayB) - new Date(year, monthA - 1, dayA)
      );
    }
  },
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
      return (priceA || Infinity) > (priceB || Infinity) ? 1 : -1;
    } else if (order === 'desc') {
      return (priceA || -Infinity) < (priceB || -Infinity) ? 1 : -1;
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
      return (diffA || Infinity) > (diffB || Infinity) ? 1 : -1;
    } else if (order === 'desc') {
      return (diffA || -Infinity) < (diffB || -Infinity) ? 1 : -1;
    }
  },
};
