import MessagesParserFactory from "./MessagesParserFactory";

describe("MessagesParser", () => {
  it("должен распарсить сообщения из телеграма ", () => {
    const parser = MessagesParserFactory.create("telegram");

    const source = "Иван SuperCar1984, [31 окт. 2024 г., 20:04:18]:\nпривет!\nКак дела?";
    const actual = parser.parse(source);

    expect(actual).not.toBeNull();
    expect(actual[0].header.user).toBe("Иван SuperCar1984");
    expect(actual[0].header.date).toBe("31 окт.");
    expect(actual[0].header.year).toBe("2024");
    expect(actual[0].header.time).toBe("20:04:18");
    expect(actual[0].messages).toEqual(["привет!", "Как дела?"]);
  });

  it("должен распарсить сообщения из диалога", () => {
    const parser = MessagesParserFactory.create("dialog");

    const source =
      "Сергей Иванович BIG: Привет, Анна BREAD! Я думал сходить в поход с друзьями. А ты?\n" +
      "Анна BREAD: Звучит здорово!\nЯ собираюсь посетить выставку современного искусства в центре города.\n";
    const actual = parser.parse(source);

    expect(actual).not.toBeNull();

    expect(actual[0].header.user).toBe("Сергей Иванович BIG");
    expect(actual[0].header.date).toBeUndefined();
    expect(actual[0].header.year).toBeUndefined();
    expect(actual[0].header.time).toBeUndefined();
    expect(actual[0].messages).toEqual(["Привет, Анна BREAD! Я думал сходить в поход с друзьями. А ты?"]);

    expect(actual[1].header.user).toBe("Анна BREAD");
    expect(actual[1].header.date).toBeUndefined();
    expect(actual[1].header.year).toBeUndefined();
    expect(actual[1].header.time).toBeUndefined();
    expect(actual[1].messages).toEqual([
      "Звучит здорово!",
      "Я собираюсь посетить выставку современного искусства в центре города."
    ]);
  });
});
