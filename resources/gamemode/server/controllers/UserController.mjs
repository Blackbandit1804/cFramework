import db from '../database';
import Sequelize from 'sequelize'

export default class UserController {
    static async GetAccount(name, email) {
        return db.Users.findOne({
                where: {
                    [Sequelize.Op.or]: [{ name }, { email }]
                }
            })
            .then((result) => (result === null ? null : result.get()));
    }

    static async Login(name, password) {
        return db.Users.findOne({ where: { name, password } })
            .then((result) => (result === null ? null : result.get()));
    }

    static async Create(name, email, password, created_at = new Date(), updated_at = new Date()) {
        return db.Users.create({
            name,
            email,
            password,
            created_at,
            updated_at
        });
    }
}