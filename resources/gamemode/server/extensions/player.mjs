import * as alt from 'alt';
import CharacterController from '../controllers/CharacterController'
const proto = alt.Player.prototype;
/* fields; */
class Player extends alt.Player {
    constructor() {
        super();
        this._cID = null;
        this._cName = null;
        this._cash = 0;
        this._bank = 0;
        this._groups = [];
        this._sex = null;
        this._spawned = false;
        this._hunger = 0;
        this._thirst = 0;
        this._position = null;
        this._account = {
            id: null,
            characters: null
        };
    }
    spawn(x, y, z, ms) {
        this._spawned = true;
        proto.spawn.call(this, x, y, z, ms);
    }

    addGroup(group) {
        return this._groups[group] = true
    }

    removeGroup(group) {
        return delete this._groups[group]
    }

    hasGroup(group) {
        return this._groups[group] !== undefined || this._groups[group] !== false
    }

    save() {
        const { pos } = this;
        CharacterController.UpdateCharacter(this._cID, {
            health: this.health,
            cash: this._cash,
            bank: this._bank,
            groups: JSON.stringify(this._groups),
            hunger: this._hunger,
            thirst: this._thirst,
            position: JSON.stringify({ x: pos.x, y: pos.y, z: pos.z, h: this.rot.z, d: this.dimension })
        });
    }
}

alt.Player.prototype = new Player();