/**
 * Проверяет, является ли строка пустой, равной null или undefined.
 *
 * @param {string | null | undefined} str - Строка для проверки.
 * @returns {boolean} Возвращает true, если строка пустая, равная null или undefined; иначе false.
 */
function nullOrEmpty(str: string | null | undefined): boolean {
  return str === null || undefined || str?.trim().length === 0;
}

/**
 * Проверяет, является ли строка непустой и не равной null.
 *
 * @param {string | null} [str] - Опциональная строка для проверки.
 * @returns {boolean} Возвращает true, если строка не пустая и не равна null; иначе false.
 */
export default function notNullOrEmpty(str?: string | null): boolean {
  return !nullOrEmpty(str);
}
