/**
 * Генерирует аббревиатуру на основе имени пользователя.
 *
 * @param {string} username - Полное имя пользователя, состоящее из одного или нескольких слов.
 * @returns {string} Возвращает аббревиатуру
 */
export default function getAbbreviation(username: string): string {
  const names = username.trim().split(" ");

  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  const firstInitial = names[0].charAt(0).toUpperCase();
  const lastInitial = names[names.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
}
