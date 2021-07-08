import Command from '../struct/Command';
import { Message } from 'discord.js';

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      aliases: ['p'],
      description: 'Pong!',
    });
  }

  exec(message: Message) {
    return message.reply({ content: 'Pong!' });
  }
}

export default PingCommand;