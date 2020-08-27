import * as alt from 'alt'
import * as game from 'natives';
import Scene from '../../utils/classes/SceneManager'
import Browser from '../../utils/classes/Browser'
import { toggleCursor } from '../../utils/helpers/Helper'
import {
    UpdateClothes,
    UpdateParent,
    UpdateFeature,
    UpdateAppearence,
    UpdateStyles,
} from '../../utils/helpers/Player'

var CharSelect = new Browser('char_select');
const { local } = alt.Player;

alt.onServer('client/auth/select', (characters) => {
    CharSelect.create()
    Scene.start('select');
    CharSelect.receive('client/select/createCharacter', async() => { // CREATE CHARACTER BUTTON
        CharSelect.destroyBrowser();
        Scene.destroy();
        alt.emitServer('server/auth/character/createCharacter')
    })
    CharSelect.receive("client/select/selectCharacter", (char_id) => { // SELECT CHARACTER BUTTON
        alt.emitServer('server/auth/character/selectedPlayer', char_id)
        alt.setTimeout(() => {
            CharSelect.destroyBrowser();
            Scene.destroy();
            alt.toggleGameControls(true);
            game.freezeEntityPosition(local.scriptID, false);
            toggleCursor();
            alt.emit('client/game/chat/chat')
            alt.emit('client/game/hud/hud')
        }, 500)
    })
    CharSelect.receive('client/browser/loaded/charselect', () => { // LOADED PAGE, GET CHARACTERS
        CharSelect.setFocus();
        CharSelect.emit('client/select/characters', characters);
    })
});

alt.onServer('client/game/auth/CharSelect/player_customs', (models) => {
    UpdateAppearence(JSON.parse(models.appearence_data));
    UpdateParent(JSON.parse(models.parent_data));
    UpdateFeature(JSON.parse(models.feature_data));
    UpdateStyles(JSON.parse(models.styles_data));
    UpdateClothes(JSON.parse(models.clothes));
    // creating all huds
    alt.emit('client/game/bank/bank')
})