export const BASE = 'https://www.cbr-xml-daily.ru';
export const DAILY = 'https://www.cbr-xml-daily.ru/daily_json.js';
export const ARCHIVE = ({ year, month, day }) =>
  `https://www.cbr-xml-daily.ru/archive/${year}/${month}/${day}/daily_json.js`;
