import { MessagesParser } from "./types";
import MessageHeaderParserImpl from "./MessageHeaderParserImpl";
import MessagesParserImpl from "./MessagesParserImpl";
import DialogMessageParserImpl from "./DialogMessageParserImpl";
import { ViewType } from "../types";

export default class MessagesParserFactory {
  private static TELEGRAM_HEADER_PATTERN =
    /^(?<user>[ A-Za-zА-Яа-яЁё0-9]+),\s\[([0-9]+\s[0-9]+\sviews, )?(?<date>[0-9]+\s+[A-Za-zА-Яа-я.]+)\s(?<year>[0-9]+)\s*г\.\s*,\s*(?<time>[0-9]{2}:[0-9]{2}:[0-9]{2})/;

  private static DIALOG_PATTERN = /(?<user>[a-zа-я ]*):/i;

  public static create(type: ViewType): MessagesParser {
    if (type === "telegram") {
      const headerParser = new MessageHeaderParserImpl(MessagesParserFactory.TELEGRAM_HEADER_PATTERN);
      return new MessagesParserImpl(headerParser);
    }

    if (type === "dialog") {
      const headerParser = new MessageHeaderParserImpl(MessagesParserFactory.DIALOG_PATTERN);
      return new DialogMessageParserImpl(headerParser);
    }

    throw new Error(`Unexpected value: ${type}`);
  }
}
