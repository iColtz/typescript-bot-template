import Event from '../struct/Event';
import { Message, TextChannel, Guild, Collection } from 'discord.js';
import settings from '../settings';

abstract class MessageEvent extends Event {
  constructor() {
    super({
      name: 'messageCreate',
    });
  }

  exec(message: Message) {
    if (!message.content.startsWith(this.client.prefix) || message.author.bot) return;
    const args = message.content.slice(this.client.prefix.length).trim().split(/ +/);
    const commandName: string | undefined = args.shift();
    if (commandName) {
      const command = this.client.commands.get(commandName);
      if (command) {
        if (command.ownerOnly && !settings.BOT_OWNER_ID.includes(message.author.id)) {
          return void message.channel.send('This command can only be used by the owner of the bot.');
        }
        else if (command.guildOnly && !(message.guild instanceof Guild)) {
          return void message.channel.send('This command can only be used in a guild.');
        }
        if (message.channel instanceof TextChannel) {
          const userPermissions = command.userPermissions;
          const clientPermissions = command.clientPermissions;
          const missingPermissions = new Array;
          if (userPermissions?.length) {
            for (let i = 0; i < userPermissions.length; i++) {
              const hasPermission = message.member?.permissions.has(userPermissions[i]);
              if (!hasPermission) {
                missingPermissions.push(userPermissions[i]);
              }
            }
            if (missingPermissions.length) {
              return void message.channel.send(`Your missing these required permissions: ${missingPermissions.join(', ')}`);
            }
          }
          if (clientPermissions?.length) {
            for (let i = 0; i < clientPermissions.length; i++) {
              const hasPermission = message.guild?.me?.permissions.has(clientPermissions[i]);
              if (!hasPermission) {
                missingPermissions.push(clientPermissions[i]);
              }
            }
            if (missingPermissions.length) {
              return void message.channel.send(`I\'m missing these required permissions: ${missingPermissions.join(', ')}`);
            }
          }
        }
        if (command.requiredArgs && command.requiredArgs > args.length) {
          return void message.channel.send(`Invalid usage of this command, please refer to \`${this.client.prefix}help ${command.name}\``);
        }
        if (command.cooldown) {
          if (!this.client.cooldowns.has(command.name)) {
            this.client.cooldowns.set(command.name, new Collection());
          }
          const now = Date.now();
          const timestamps = this.client.cooldowns.get(command.name);
          const cooldownAmount = command.cooldown * 1000;
          if (timestamps?.has(message.author.id)) {
            const cooldown = timestamps.get(message.author.id);
            if (cooldown) {
              const expirationTime = cooldown + cooldownAmount;
              if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return void message.channel.send(`Wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
              }
            }
          }
          timestamps?.set(message.author.id, now);
          setTimeout(() => timestamps?.delete(message.author.id), cooldownAmount);
        }
        try {
          return void command.exec(message, args);
        }
        catch (error) {
          console.log(error);
          message.reply('there was an error running this command.');
        }
      }
    }
  }
}

export default MessageEvent;