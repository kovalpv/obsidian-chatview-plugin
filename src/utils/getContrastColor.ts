type RGB = [number, number, number];

/**
 * Преобразует цвет из формата HEX в формат RGB.
 *
 * @param {string} hex - Строка, представляющая цвет в формате HEX (например, #ff5733).
 * @returns {RGB | null} Возвращает массив из трех чисел (красный, зеленый, синий) в диапазоне от 0 до 255.
 */
function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? ([parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] as RGB) : null;
}

/**
 * Вычисляет яркость цвета на основе его компонентов RGB.
 *
 * @param {RGB} rgb - Массив из трех чисел (красный, зеленый, синий), представляющих цвет.
 * @returns {number} Возвращает число, представляющее яркость цвета в диапазоне от 0 до 1.
 */
function getLuminance(rgb: RGB): number {
  const [r, g, b] = rgb.map((value) => value / 255);
  return (
    0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
    0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) +
    0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4))
  );
}

/**
 * Определяет контрастный цвет (черный или белый) на основе заданного цвета фона.
 *
 * @param {string} backgroundColor - Цвет фона в формате HEX (например, #ff5733).
 * @returns {string} Возвращает '#000000' для черного цвета или '#FFFFFF' для белого цвета.
 * @throws {Error} Выбрасывает ошибку, если формат цвета фона неверен.
 */
export default function getContrastColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) {
    throw new Error("Invalid hex color format");
  }

  const luminance = getLuminance(rgb);
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
