import { Message, HeaderParser } from "./types";
import MessagesParserImpl from "@parser/MessagesParserImpl";

export default class DialogMessageParserImpl extends MessagesParserImpl {
  constructor(readonly headerParser: HeaderParser) {
    super(headerParser);
  }

  parse(text: string): Message[] {
    const result = text.replace(/^([a-zа-я ]*:)/gim, "$1\n");
    return super.parse(result);
  }
}
