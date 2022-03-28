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
  let year, month, day;
  try {
    const dailyResponse = await fetch(urls.DAILY);
    const dailyJson = await dailyResponse.json();
    [year, month, day] = dailyJson.Date.slice(0, 10).split('-');
  } catch (error) {
    console.log('Error fetching daily currency data');
  }

  const dates = new Array(period).fill(null).map((_, i) => {
    const date = new Date(+year, month - 1, +day);
    date.setDate(date.getDate() - i);
    return date;
  });
  const result = dates.map(async (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    try {
      return await fetch(
        urls.ARCHIVE({
          year,
          month,
          day,
        })
      );
    } catch (error) {
      console.log(
        `Ошибка получения данных за ${day}.${month}.${year} \nКурс ЦБ РФ на данную дату не установлен. Проверить: https://www.cbr.ru/currency_base/daily/`
      );
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
