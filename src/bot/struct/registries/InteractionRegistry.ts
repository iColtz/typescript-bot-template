import { ApplicationCommandData } from "discord.js";
import { sync } from "glob";
import { resolve } from "path";
import Bot from "../../client/Client";
import Interaction from "../Interaction";

const registerInteraction: Function = (client: Bot) => {
    const interactionFiles = sync(resolve('src/bot/interactions/**/*'));
    interactionFiles.forEach(async (file) => {
        if (/\.(j|t)s$/iu.test(file)) {
            const File = require(file).default;
            if (File && File.prototype instanceof Interaction) {
                const interaction: Interaction = new File;
                interaction.client = client;
                client.interactions.set(interaction.name, interaction);
                const data: ApplicationCommandData = {
                    name: interaction.name,
                    description: interaction.description ?? "Empty description",
                    options: interaction.options ?? []
                };
                // await client.guilds.cache.get('Guild ID')?.commands.create(data); // Guild commands
                // await client.guilds.cache.get('Guild ID')?.commands.set([]); // Remove all guild commands
                await client.application?.commands.create(data); // Global commands
                // await client.application?.commands.set([]); // Remove all guild commands
            };
        };
    });
};

export default registerInteraction;