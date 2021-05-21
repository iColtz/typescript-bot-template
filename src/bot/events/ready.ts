import Event from '../struct/Event';
import { InteractionRegistry } from '../struct/registries/export/RegistryIndex';

abstract class ReadyEvent extends Event {
  constructor() {
    super({
      name: 'ready',
    });
  }

  async exec() {
    InteractionRegistry(this.client);
    console.log('Ready!');
  }
}

export default ReadyEvent;