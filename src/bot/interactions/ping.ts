import { CommandInteraction } from "discord.js";
import Interaction from "../struct/Interaction";

abstract class PingInteraction extends Interaction {
    constructor() {
        super({
            name: "ping",
            descrition: "check the bot ping"
        });
    };

    async exec(interaction: CommandInteraction) {
        interaction.reply(`My ping is ${Math.round(this.client.ws.ping)}ms`, { ephemeral: true });
    };
};

export default PingInteraction;