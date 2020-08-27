import * as alt from 'alt'
import * as game from 'natives';
import Browser from '../../utils/classes/Browser'
import { getSpeed } from '../../utils/helpers/Helper'

var HUD_CEF = new Browser('hud');
var Loaded;
alt.on('client/game/hud/hud', async() => {
    HUD_CEF.create();

    HUD_CEF.receive('client/browser/loaded/hud', () => {
        Loaded = 1;
        updateHungerThirst();
    })
})

let intervalSave;
let intervalLoaded;

let AutoSaveHungerThirstTimer = 60000; // Value in ms. Currently set to 1min
let factorFaim = (1000 * 100) / 2400000; // Ratio to consume hunger's bar
let factorSoif = (1000 * 100) / 1800000; // Ratio to consume thirst's bar
let faim = 0;
let soif = 0;

function updateHungerThirst() {
    intervalLoaded = alt.setInterval(() => {
        var ped = alt.Player.local.scriptID;
        if (faim <= 0) faim = 0;
        if (soif <= 0) soif = 0;

        if (game.isPedOnFoot(ped)) {
            let x = Math.min(getSpeed(), 10) + 1
            if (game.isPedInMeleeCombat(ped)) {
                x = x + 10
                faim = faim - (factorFaim * x)
                soif = soif - (factorSoif * x)
            } else {
                faim = faim - (factorFaim * x)
                soif = soif - (factorSoif * x)
            }
        } else {
            faim = fain - factorFaim
            soif = soif - factorSoif
        }
    }, 1000)
    intervalSave = alt.setInterval(() => {
        if (Loaded) {
            alt.emitServer('server/game/auth/character/hungerandthirst', parseFloat(faim), parseFloat(soif))
        } else {
            if (intervalSave) {
                alt.clearInterval(intervalSave);
                intervalSave = null;
            }
        }
    }, AutoSaveHungerThirstTimer)
}

var Health = 0;
var Armour = 0;
let Hunger = 0;
let Thirst = 0;
alt.everyTick(() => {
    if (Loaded) {
        var ped = alt.Player.local.scriptID;
        // disable health and armour hud
        alt.beginScaleformMovieMethodMinimap('SETUP_HEALTH_ARMOUR');
        game.scaleformMovieMethodAddParamInt(3);
        game.endScaleformMovieMethod();

        if (Health !== game.getEntityHealth(ped)) {
            Health = game.getEntityHealth(ped);
            HUD_CEF.emit('client/browser/health/hud', Health)
        }
        if (Armour !== game.getPedArmour(ped)) {
            Armour = game.getPedArmour(ped);
            HUD_CEF.emit("client/browser/armour/hud", Armour)
        }
        if (Hunger !== faim) {
            Hunger = faim;
            HUD_CEF.emit("client/browser/hunger/hud", Hunger)
        }
        if (Thirst !== soif) {
            Thirst = soif;
            HUD_CEF.emit("client/browser/thirst/hud", Thirst)
        }
    }
})

alt.onServer('client/browser/received/hud', (hunger, thirst) => {
    faim = hunger;
    soif = thirst;
})

alt.on('disconnect', () => {
    Loaded = 0;
})