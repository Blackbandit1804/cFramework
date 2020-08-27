import * as alt from 'alt';
import db from '../database/index'
import serverLoader from '../loaders/Loader';

const rp = {};
export default class Server {
    static async start() {
        try {
            rp.ready = 0;
            await Server.checkDb();
            await Server.loadConfigs();
            await Server.loadClasses();
            await Server.loadExtensions();
            await Server.loadControllers();
            await Server.loadGame();
            rp.ready = 1;
            alt.log("Servidor Iniciado")
        } catch (err) {
            console.log(err);
        }
    }
    static checkDb() {
        return db.connection.authenticate();
    }
    static loadConfigs() {
        return serverLoader('./config');
    }

    static loadClasses() {
        return serverLoader('./classes');
    }

    static loadExtensions() {
        return serverLoader('./extensions');
    }

    static loadControllers() {
        return serverLoader('./controllers');
    }

    static loadGame() {
        return serverLoader('./game')
    }

    static stop() {
        process.exit(1);
    }

    static stopGracefully() {}
}

export { rp };