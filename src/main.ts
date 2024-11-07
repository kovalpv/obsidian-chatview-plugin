import { App, Plugin, PluginManifest } from "obsidian";
import ChatViewRenderer from "./ChatViewRenderer";
import { parseInput } from "./utils";
import "./main.css";

export default class ChatPlugin extends Plugin {
  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    await this.loadData();
    this.registerMarkdownCodeBlockProcessor("chat", (src, el) => {
      const { view, source } = parseInput(src);
      new ChatViewRenderer(source, el, { view });
    });
  }
}
