import * as alt from 'alt'
import * as game from 'natives';
import Scene from '../../utils/classes/SceneManager'
import Browser from '../../utils/classes/Browser'
import { enableInput } from '../../utils/classes/Controls'
import { toggleCursor } from '../../utils/helpers/Helper'

var Auth = new Browser('auth');
const { local } = alt.Player;

alt.onServer('client/game/auth/auth', () => {
    Auth.create();
    Auth.setFocus();
    toggleCursor();

    game.freezeEntityPosition(local.scriptID, true);
    alt.toggleGameControls(false);

    Scene.start('auth');

    Auth.receive('client/browser/emitServer', (event, ...args) => {
        alt.emitServer(event, ...args);
    });

    Auth.receive('client/browser/loaded/auth', () => {
        if (alt.Discord.currentUser) {
            Auth.emit('client/browser/discord/auth', alt.Discord.currentUser)
        }
    })
});

alt.onServer('client/auth/message', (field, message) => {
    Auth.emit('client/browser/response/auth', field, message);
})

alt.onServer('client/auth/success', () => {
    alt.emitServer('server/auth/success')
    Auth.destroyBrowser();
    Scene.destroy();
})