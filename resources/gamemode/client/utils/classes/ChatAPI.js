import * as game from 'natives';
import Browser from './Browser'
import alt from 'alt';
import { toggleCursor } from '../helpers/Helper'

export default class ChatAPI {
    constructor(chat) {
        this.chat = chat;
        this.created = true;
        this.opened = false;
    }

    async ChatHide() {
        if (this.chat && this.opened) {
            this.chat.removeFocus();
            this.chat.emit('client/browser/chat/hideChat')
        }
    }
    async ChatUnhide() {
        if (this.chat && !this.opened) {
            this.chat.emit('client/browser/chat/activeChat')
        }
    }

    async chatCursor() {
        if (this.chat && !this.opened) {
            this.chat.setFocus();
            toggleCursor();
        }
    }

    async isChatOpened() {
        return this.opened;
    }

    async OpenChat() {
        this.opened = true;
    }

    async CloseChat() {
        this.opened = false;
        this.chat.removeFocus();
    }

    async ChatInput() {
        if (this.chat && !this.opened) {
            this.OpenChat();
            this.chat.setFocus();
            this.chat.emit('client/browser/chat/openInput')
        } else {
            this.chat.removeFocus();
        }
    }

    async addMessage() {

    }

    async onFocusChange() {

    }

    async SendClientMessage() {

    }

    async SendClientMessageToAll(message, tab) {}

    async ClearAllChat() {

    }
}