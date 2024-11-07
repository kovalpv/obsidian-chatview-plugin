import getSettingsAndSource from "./getSettingsAndSource";

describe("getSettingsAndSource", () => {
  it("должен вернуть чат телеграм и пустой текст", () => {
    const p = getSettingsAndSource("");
    expect(p.view).toBe("telegram");
    expect(p.source).toBe("");
  });

  it("должен вернуть чат телеграм и пустой текст", () => {
    const p = getSettingsAndSource("chat:  telegram \n---");
    expect(p.view).toBe("telegram");
    expect(p.source).toBe("");
  });

  it("должен вернуть чат телеграм и пустой текст", () => {
    const p = getSettingsAndSource("view:  telegram \n---");
    expect(p.view).toBe("telegram");
    expect(p.source).toBe("");
  });

  it("должен вернуть чат телеграм и текст", () => {
    const p = getSettingsAndSource("view:  telegram \n---Какой-то текст");
    expect(p.view).toBe("telegram");
    expect(p.source).toBe("Какой-то текст");
  });

  it("должен вернуть чат dialog и текст", () => {
    const p = getSettingsAndSource("view:  dialog \n---Какой-то другой текст");
    expect(p.view).toBe("dialog");
    expect(p.source).toBe("Какой-то другой текст");
  });
});
