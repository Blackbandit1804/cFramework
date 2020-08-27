import Sequelize from 'sequelize'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as config from '../config/database.js'

const db = {};
const currentPath = path.dirname(fileURLToPath(
    import.meta.url));
const cache = {};

const sequelize = new Sequelize(config.default);

async function importModel(importPath) {
    if (!cache[importPath]) {
        let defineCall = await
        import (importPath);
        defineCall = defineCall.default;
        cache[importPath] = defineCall(sequelize, Sequelize.DataTypes);
    }
    return cache[importPath];
}

fs
    .readdirSync(path.join(currentPath, 'models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.mjs') && (file.slice(-4) === '.mjs'))
    .forEach(async(file) => {
        const model = await importModel(`./models/${file}`);
        db[model.name] = model;
        if (db[model.name].associate) {
            db[model.name].associate(db);
        }
    });


db.connection = sequelize;
db.Sequelize = Sequelize;

export default db;