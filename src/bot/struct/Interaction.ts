import { ApplicationCommandOptionData, Interaction } from "discord.js";
import Bot from "../client/Client";
import { InteractionType } from "../types/Options";

abstract class InteractionCommand {
    public name: string;
    public description: string;
    public options: ApplicationCommandOptionData[] | undefined;
    public abstract client: Bot;

    constructor(options: InteractionType) {
        this.name = options.name;
        this.description = options.descrition ?? "";
        this.options = options.options;
    };

    public abstract exec(interactions: Interaction, args: (string | number | boolean | undefined)[]): unknown | Promise<unknown>;
};

export default InteractionCommand;