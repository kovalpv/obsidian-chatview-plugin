export type Header = {
  readonly user: string;
  readonly date?: string;
  readonly year?: string;
  readonly time?: string;
};

export type Message = {
  readonly header: Header;
  readonly messages: string[];
};

export interface HeaderParser {
  getHeader(line: string): Header;

  test(line: string): boolean;
}

export interface MessagesParser {
  parse(text: string): Message[];
}
