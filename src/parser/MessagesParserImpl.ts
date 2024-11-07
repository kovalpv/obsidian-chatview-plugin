import { Message, Header, HeaderParser, MessagesParser } from "./types";
import { notNullOrEmpty } from "@utils/index";

export default class MessagesParserImpl implements MessagesParser {
  constructor(readonly headerParser: HeaderParser) {}

  parse(text: string): Message[] {
    const result: Message[] = [];

    let header: Header | null = null;
    let messages: string[] = [];

    for (const line of text.split("\n").filter(notNullOrEmpty)) {
      if (this.headerParser.test(line)) {
        if (header !== null) {
          result.push({ header, messages });
          header = null;
          messages = [];
        }
        header = this.headerParser.getHeader(line);
        continue;
      }

      if (header) {
        messages.push(line.trim());
      }
    }
    if (header !== null) {
      result.push({ header, messages });
    }

    return result;
  }
}
