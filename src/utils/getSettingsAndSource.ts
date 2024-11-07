import notNullOrEmpty from "./notNullOrEmpty";
import { ViewType } from "../types";

export type SettingsAndSource = {
  view: ViewType;
  source: string;
};

/**
 * Извлекает параметры и их значения из входной строки, форматированной как "параметр: значение".
 *
 * @param {string | null | undefined} input - Входная строка для анализа.
 * @returns {Record<string, string>} Объект, где каждый ключ представляет собой имя параметра, а значение — соответствующее значение.
 */
function getSettings(input?: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (notNullOrEmpty(input)) {
    const regex = /(?<parameter>[a-z]*): (?<value>.*)/i;
    input
      ?.split("\n")
      .filter(notNullOrEmpty)
      .forEach((line) => {
        if (regex.test(line)) {
          const values = regex.exec(line);
          const ads = values?.groups ?? {};
          result[ads.parameter] = ads.value;
        }
      });
  }
  return result;
}

/**
 * Извлекает из входящей строки параметры и источник текста.
 *
 * @param {string} input - Входная строка для парсинга.
 * @returns {SettingsAndSource} Объект, содержащий тип представления и источник текста.
 * @throws {Error} Выбрасывает ошибку, если вторая часть строки отсутствует.
 */
export default function getSettingsAndSource(input: string): SettingsAndSource {
  if (input.includes("---")) {
    const parts = input.split("---");

    const parameters = getSettings(parts[0] ? parts[0].trim() : undefined);
    const source = parts[1] ? parts[1].trim() : "";
    if (source === null || source === undefined) {
      throw new Error("The second part is required.");
    }
    let view: ViewType = "telegram";
    if ((parameters["view"] ?? "").trim() === "dialog") {
      view = "dialog";
    }

    return { view, source };
  }

  return { view: "telegram", source: input };
}
