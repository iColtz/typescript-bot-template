import { Interaction } from "discord.js";
import Event from "../struct/Event"

abstract class InteractionEvent extends Event {
    constructor() {
        super({
            name: "interaction",
        });
    };

    async exec(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (!interaction.command) return;

        const command = this.client.interactions.get(interaction.command.name);

        try {
            await command?.exec(interaction, interaction.options.map((v) => v.value));
        } catch (err) {
            console.log(err);
            return interaction.reply("An unexpected error occurred");
        };
    };
};

export default InteractionEvent;