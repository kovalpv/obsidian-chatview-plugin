/**
 * Преобразует букву в числовое значение.
 *
 * @param {string} letter - Буква для преобразования.
 * @returns {number} Возвращает числовое значение буквы.
 */
function letterToValue(letter: string): number {
  if (letter >= "A" && letter <= "Z") {
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 1;
  } else if (letter >= "А" && letter <= "Я") {
    return letter.charCodeAt(0) - "А".charCodeAt(0) + 1;
  }
  return 0;
}

/**
 * Генерирует цвет в формате HEX на основе двух входных букв.
 *
 * @param {string} letter1 - Первая буква (должна быть длиной 1).
 * @param {string} letter2 - Вторая буква (должна быть длиной 1).
 * @returns {string} Возвращает строку, представляющую цвет в формате HEX.
 * @throws {Error} Выбрасывает ошибку, если обе входные строки не являются одиночными буквами.
 */
export default function generateColorFromLetters(letter1: string, letter2: string): string {
  if (letter1.length !== 1 || letter2.length !== 1) {
    throw new Error("Both inputs must be single letters.");
  }

  const red = (letterToValue(letter1.toUpperCase()) * 10) % 256;
  const green = (letterToValue(letter2.toUpperCase()) * 10) % 256;
  const blue = (red + green) / 2;
  return `#${((1 << 24) + (red << 16) + (green << 8) + Math.round(blue)).toString(16).slice(1).toUpperCase()}`;
}
