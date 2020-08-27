import * as alt from 'alt'
import * as game from 'natives';
import Browser from '../../utils/classes/Browser'
import ChatAPI from '../../utils/classes/ChatAPI'
import { gameControls } from '../../utils/helpers/Helper'

var CHAT_CEF = new Browser('chat');
var CHAT_API;

alt.on('client/game/chat/chat', async() => {
    CHAT_CEF.create();
    CHAT_API = new ChatAPI(CHAT_CEF);
    CHAT_CEF.emit('client/browser/chat/activeChat')

    CHAT_CEF.receive('client/browser/emitServer', (event, ...args) => {
        alt.emitServer(event, ...args);
    });

    CHAT_CEF.receive('client/browser/chat/closeChat', () => {
        CHAT_API.CloseChat();
    })
    alt.emitServer('server/classes/ChatAPI/created')
})

alt.onServer('client/classes/ChatAPI/message', (msg, tab) => {
    if (CHAT_API) {
        CHAT_API.CloseChat();
        gameControls(true);
        CHAT_CEF.emit("client/browser/chat/addMessage", msg, tab);
    }
})
alt.onServer('client/classes/ChatAPI/closeChat', () => {
    if (CHAT_API) {
        CHAT_API.CloseChat();
        gameControls(true);
    }
})

alt.on('keydown', (e) => {
    if (CHAT_API) {
        if (e == 84) {
            alt.setTimeout(() => {
                CHAT_API.ChatInput();
            }, 50)
            gameControls(false);
        } else if (e == 18) {
            CHAT_API.CloseChat();
            CHAT_API.chatCursor();
        } else if (e == 13) {
            CHAT_CEF.emit('client/browser/chat/showTemp')
        } else if (e == 27 && CHAT_API.isChatOpened()) {
            CHAT_API.CloseChat();
            CHAT_CEF.emit('client/browser/chat/hideChat');
            gameControls(true);
        }
    }
})