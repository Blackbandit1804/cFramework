import * as alt from 'alt'
import * as game from 'natives';
import Browser from '../../utils/classes/Browser'
import { gameControls } from '../../utils/helpers/Helper'
import { toggleCursor } from '../helpers/Helper'

const objects = ["prop_fleeca_atm", "prop_atm_01", "prop_atm_02", "prop_atm_03"]
var Bank = {}
Bank.ATM = null
Bank.Delay = 0
Bank.Loaded = 0;
Bank.CEF = new Browser('bank')

alt.on('client/game/bank/bank', () => {
    Bank.Loaded = 1;
    Bank.CEF.receive('client/browser/bank/close', () => {
        Bank.CEF.destroyBrowser();
        gameControls(true);
        toggleCursor();
    })
})

alt.everyTick(() => {
    if (Bank.Loaded) {
        var position = game.getEntityCoords(alt.Player.local.scriptID);
        for (const [objectId, objectData] of Object.entries(objects)) {
            Bank.ATM = game.getClosestObjectOfType(position.x, position.y, position.z, 1.0, game.getHashKey(objectData), true)
            if (Bank.ATM !== 0) {
                break;
            }
        }
    }
})

alt.everyTick(() => {
    if (Bank.Loaded) {
        if (Bank.ATM !== 0) {
            if (Bank.Delay == 0) {
                if (game.isControlJustReleased(1, 38)) {
                    Bank.CEF.create();
                    toggleCursor();
                    Bank.CEF.setFocus();
                    gameControls(false);
                }
            }
        }
    }
})