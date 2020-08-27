import * as game from 'natives';

export default class Ped {
  constructor(model, x, y, z) {
    this.scriptID = game.createPed(
      1,
      game.getHashKey(model),
      x,
      y,
      z,
      0,
      false,
      false,
    );
  }

  destroy() {
    game.deleteEntity(this.scriptID);
  }
}
