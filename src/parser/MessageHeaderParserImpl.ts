import { HeaderParser, Header } from "./types";

export default class MessageHeaderParserImpl implements HeaderParser {
  constructor(readonly regExp: RegExp) {}

  test(line: string): boolean {
    return this.regExp.test(line);
  }

  getHeader(line: string): Header {
    const actual = this.regExp.exec(line);

    const groups: Record<string, string> = actual?.groups ?? {};

    return {
      user: groups["user"],
      date: groups["date"],
      year: groups["year"],
      time: groups["time"]
    };
  }
}
