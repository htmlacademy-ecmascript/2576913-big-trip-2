import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

/**
 * Преобразует дату в человекочитаемый формат
 * @param {Date} date - Дата
 * @param {string} format - Формат даты
 * @returns {string} - Человекочитаемая дата
 */
function humanizePointDate(date, format = DATE_FORMAT) {
  return date ? dayjs(date).format(format) : '';
}

/**
 * Преобразует время в человекочитаемый формат
 * @param {Date} date - Время
 * @param {string} format - Формат времени
 * @returns {string} - Человекочитаемое время
 */
function humanizePointTime(date, format = TIME_FORMAT) {
  return date ? dayjs(date).format(format) : '';
}

/**
 * Подсчитывает продолжительность точки маршрута
 * @param {Date} dateFrom - Дата начала
 * @param {Date} dateTo - Дата окончания
 * @returns {string} - Продолжительность точки маршрута
 */
function countPointDuration(dateFrom, dateTo) {
  const durationInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (durationInMinutes < 60) {
    return `${durationInMinutes}M`;
  }

  const days = Math.floor(durationInMinutes / (60 * 24));
  const hours = Math.floor((durationInMinutes % (60 * 24)) / 60);
  const minutes = durationInMinutes % 60;

  if (days === 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }

  return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
}

/**
 * Проверяет, является ли точка маршрута будущей
 * @param {Date} dateFrom - Дата начала
 * @returns {boolean} - true, если точка будущая, иначе false
 */
function isPointFuture(dateFrom) {
  return dateFrom && dayjs(dateFrom).isAfter(dayjs());
}

/**
 * Проверяет, является ли точка маршрута прошедшей
 * @param {Date} dateTo - Дата окончания
 * @returns {boolean} - true, если точка прошедшая, иначе false
 */
function isPointPast(dateTo) {
  return dateTo && dayjs(dateTo).isBefore(dayjs());
}

/**
 * Проверяет, является ли точка маршрута текущей
 * @param {Date} dateFrom - Дата начала
 * @param {Date} dateTo - Дата окончания
 * @returns {boolean} - true, если точка текущая, иначе false
 */
function isPointPresent(dateFrom, dateTo) {
  const now = dayjs();
  return dateFrom && dateTo && dayjs(dateFrom).isBefore(now) && dayjs(dateTo).isAfter(now);
}

/**
 * Функция сортировки точек по дате начала
 * @param {*} aPoint
 * @param {*} bPoint
 * @returns
 */
function sortPointsByDate(aPoint, bPoint) {
  return dayjs(aPoint.dateFrom).diff(dayjs(bPoint.dateFrom));
}

/**
 * Функция сортировки точек по цене
 * @param {*} aPoint
 * @param {*} bPoint
 * @returns
 */
function sortPointsByPrice(aPoint, bPoint) {
  return bPoint.basePrice - aPoint.basePrice;
}

/**
 * Функция сортировки точек по длительности
 * @param {*} aPoint
 * @param {*} bPoint
 * @returns
 */
function sortPointsByTime(aPoint, bPoint) {
  const aPointDuration = dayjs(aPoint.dateTo).diff(dayjs(aPoint.dateFrom), 'minute');
  const bPointDuration = dayjs(bPoint.dateTo).diff(dayjs(bPoint.dateFrom), 'minute');

  return bPointDuration - aPointDuration;
}

export {humanizePointDate, humanizePointTime, countPointDuration, isPointFuture, isPointPast, isPointPresent, sortPointsByPrice, sortPointsByTime, sortPointsByDate};
