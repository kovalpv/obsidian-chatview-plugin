import { Message, MessagesParserFactory } from "@parser/index";
import { generateColorFromLetters, getAbbreviation, getContrastColor } from "@utils/index";
import { ViewType } from "./types";

export type ChatViewRendererProperties = {
  view: ViewType;
};

export default class ChatViewRenderer {
  private readonly parent: HTMLElement;
  private readonly messages: Message[];

  constructor(src: string, parent: HTMLElement, settings: ChatViewRendererProperties) {
    const parser = MessagesParserFactory.create(settings.view ?? "telegram");
    this.parent = parent;
    this.messages = parser.parse(src);
    this.render();

    this.parent.onscroll = () => {
      const titles: NodeListOf<HTMLDivElement> = this.parent.querySelectorAll(".month-day");
      for (let i = 0; i < titles.length - 1; i++) {
        const prev = titles[i];
        const current = titles[i + 1];

        if (prev.offsetTop >= current.offsetTop - 16) {
          current.setCssProps({ visibility: "visible" });
          prev.setCssProps({ visibility: "hidden" });
        } else {
          prev.setCssProps({ visibility: "visible" });
        }
      }
    };
  }

  render() {
    const dates = new Set<string>();
    this.parent.className = "chat";
    let rendered = false;
    for (const message of this.messages) {
      const { user, date, time } = message.header;

      if (date && !dates.has(date)) {
        const monthDay = this.parent.createDiv({ cls: "month-day" });
        monthDay.createDiv({ cls: "month-day__title", text: date });
        dates.add(date);
      }

      const abbr = getAbbreviation(user);

      const headerEl = this.parent.createDiv({ cls: "header" });

      const color = generateColorFromLetters(abbr[0], abbr[1]);
      headerEl.createDiv({ cls: "header__abbr", text: abbr }).setCssProps({
        "background-color": color,
        color: getContrastColor(color)
      });

      const titleEl = headerEl.createDiv({ cls: "header__title" });

      titleEl.createDiv({ cls: "header__user", text: user }).setCssProps({
        color: color
      });
      titleEl.createDiv({ cls: "header__time", text: time });

      for (const line of message.messages) {
        this.parent.createDiv({ cls: "message", text: line });
      }
      rendered = true;
    }
    if (!rendered) {
      this.parent.createDiv({ cls: "error", text: "Не удалось отобразить чат" });
    }
  }
}
