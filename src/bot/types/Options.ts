import { PermissionString, Message, ApplicationCommandOptionData, Interaction } from 'discord.js';

export interface CommandOptions {
  name: string,
  aliases?: string[],
  description: string,
  usage?: string,
  category?: string,
  cooldown?: number,
  ownerOnly?: boolean,
  guildOnly?: boolean,
  requiredArgs?: number,
  userPermissions?: PermissionString[],
  clientPermissions?: PermissionString[],
  exec: (msg: Message, args: string[]) => unknown | Promise<unknown>,
};

export interface InteractionCommandOptions {
  name: string,
  descrition?: string,
  options?: ApplicationCommandOptionData[],
  exec: (interactions: Interaction, args: (string | number | boolean | undefined)[]) => unknown | Promise<unknown>
}

export type CommandType = Omit<CommandOptions, 'exec'>;
export type InteractionType = Omit<InteractionCommandOptions, 'exec'>;

export interface EventOptions {
  name: string,
  once?: boolean,
};