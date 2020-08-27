import * as game from 'natives';
import alt from 'alt';

export default class Browser {
    constructor(name) {
        this.name = name;
        this.browser = [];
    }

    async create() {
        return this.browser[this.name] = new alt.WebView('http://resource/client/browser/html/' + this.name + '.html')
    }

    async emit(event, ...args) {
        this.browser[this.name].emit(event, ...args);
    }

    async receive(event, handler) {
        let receiver = async function(...args) {
            let result = await handler(...args);
            return result;
        }
        this.browser[this.name].on(`${event}`, receiver);
    }

    async isVisible() {
        return this.browser[this.name].isVisible;
    }

    async setFocus() {
        this.browser[this.name].focus();
    }

    async removeFocus() {
        this.browser[this.name].unfocus();
    }

    async destroyBrowser() {
        this.browser[this.name].unfocus();
        this.browser[this.name].destroy();
    }
}