import * as alt from 'alt';
import { delayTimer, helpers } from '../config/AutoMessages.mjs'

let cmdHandlers = {};

alt.onClient('server/classes/ChatAPI', async(player, msg, tab) => {
    if (msg[0] === '/') {
        msg = msg.trim().slice(1);
        if (msg.length > 0) {
            alt.log('[CHAT] ' + player._cName + '[' + player._cID + ']: /' + msg);
            let args = msg.split(' ');
            let cmd = args.shift();
            invokeCmd(player, cmd, args);
        }
    } else {
        if (msg.length > 0) {
            if (tab.includes("Local")) {
                var formattedMessage = `~c~${player._cName}[${player._cID}]: ~w~${msg}`;
                alt.emitClient(null, 'client/classes/ChatAPI/message', formattedMessage, tab)
            } else if (tab.includes("Global")) {
                var formattedMessage = `~c~${player._cName}[${player._cID}]: ~w~${msg}`;
                alt.emitClient(null, 'client/classes/ChatAPI/message', formattedMessage, tab)
            } else if (tab.includes("Admin")) {

            }
        };
    }
})

function invokeCmd(player, cmd, args) {
    const callback = cmdHandlers[cmd];
    if (callback) {
        alt.emitClient(player, 'client/classes/ChatAPI/closeChat');
        callback(player, args);
    } else {
        alt.emitClient(player, 'client/classes/ChatAPI/message', `~r~Este comando não existe.`, 'Global')
    }
}

export function registerCmd(cmd, callback) {
    if (cmdHandlers[cmd] !== undefined) {
        alt.logError(`Falha ao registrar o comando /${cmd}, ele já existe.`);
    } else {
        cmdHandlers[cmd] = callback;
    }
}

/*
    Helper Message Text
*/
var messageIndex = 0;
var heartbeatInterval;
alt.onClient('server/classes/ChatAPI/created', async() => {
    heartbeatInterval = setInterval(function() {
        if (messageIndex < helpers.length) {
            var formattedMessage = `~c~[SISTEMA]: ~w~${helpers[messageIndex]}`;
            alt.emitClient(null, 'client/classes/ChatAPI/message', formattedMessage, 'Global')
            messageIndex++;
        } else {
            messageIndex = 0;
        }
    }, delayTimer * 60 * 1000)
})