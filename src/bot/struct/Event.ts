import { EventOptions } from '../types/Options';
import Bot from '../client/Client'
import { ClientEvents } from 'discord.js';

abstract class Event {
	public name: keyof ClientEvents;
	public type: boolean;
	public abstract client: Bot;

	constructor(options: EventOptions) {
		this.name = options.name;
		this.type = options.once ?? false;
	}

	public abstract exec(...args: any[]): void | Promise<void>;
}

export default Event;