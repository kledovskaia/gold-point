import * as urls from '../constants/urls';

export const fetchDaily = async () => {
  try {
    const response = await fetch(urls.DAILY);
    const data = await response.json();
    return data.Valute;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const fetchLastNDays = async (period) => {
  const dates = new Array(period).fill(null).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });
  const result = dates.map(async (date) => {
    try {
      return await fetch(
        urls.ARCHIVE({
          year: date.getFullYear(),
          month: (date.getMonth() + 1).toString().padStart(2, '0'),
          day: date.getDate().toString().padStart(2, '0'),
        })
      );
    } catch {
      return null;
    }
  });
  const responses = await Promise.allSettled(result);
  const jsones = responses.map(
    (entity) => entity.value && entity.value?.json()
  );

  let resolvedJsones = await Promise.allSettled(jsones);
  resolvedJsones = resolvedJsones.map((entity) => entity && entity.value);

  return dates.reduce(
    (result, date, i) => ({
      ...result,
      [resolvedJsones[i]?.Date || date.toISOString()]:
        resolvedJsones[i] && resolvedJsones[i].Valute,
    }),
    {}
  );
};
