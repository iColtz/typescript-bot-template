import Bot from "../../client/Client";
import Event from "../Event";
import { sync } from "glob";
import { resolve } from "path";

const registerEvents: Function = (client: Bot) => {
  const eventFiles = sync(resolve(__dirname + "/../../events/**/*"));
  eventFiles.forEach((file) => {
    if (/\.(j|t)s$/iu.test(file)) {
      const File = require(file).default;
      if (File && File.prototype instanceof Event) {
        const event: Event = new File();
        event.client = client;
        client.events.set(event.name, event);
        client[event.type ? "once" : "on"](event.name, (...args: any[]) =>
          event.exec(...args)
        );
      }
    }
  });
};

export default registerEvents;
