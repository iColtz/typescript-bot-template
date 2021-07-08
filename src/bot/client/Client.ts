import { Client, Collection, Intents } from 'discord.js';
import { CommandRegistry, EventRegistry } from '../struct/registries/export/RegistryIndex';
import { CommandOptions, EventOptions, InteractionCommandOptions } from '../types/Options';
import settings from '../settings';

class Bot extends Client {
  public prefix: string;

  public commands = new Collection<string, CommandOptions>();

  public interactions = new Collection<string, InteractionCommandOptions>();

  public cooldowns = new Collection<string, Collection<string, number>>();

  public events = new Collection<string, EventOptions>();

  public constructor() {
    super({
      /* Discord JS Client Options */
      intents: Intents.FLAGS.GUILDS,
      allowedMentions: { repliedUser: false }
    });

    this.prefix = settings.PREFIX;
  }

  public start() {
    CommandRegistry(this);
    EventRegistry(this);
    super.login(settings.BOT_TOKEN);
  }
}

export default Bot;