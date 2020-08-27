import db from '../database';
import * as alt from 'alt';
import { DefaultSpawn, DefaultGroups } from '../config/Spawns'

export default class CharacterController {
    static async GetCharacters(user_id) {
        return db.Character.findAll({ where: { user_id }, raw: true })
            .then((result) => (result === null ? null : result));
    }

    static async GetCharacter(id) {
        return db.Character.findOne({ where: { id } })
            .then((result) => (result === null ? null : result.get()));
    }

    static async Get_Models(id) {
        return db.Characters_Model.findOne({ where: { id } })
            .then((result) => (result === null ? null : result.get()));
    }

    static async UpdateCharacter(id, character) {
        return db.Character.update(character, { where: { id } });
    }

    static async CreateCharacter(user_id, character_name, age, sex, hunger = 100, thirst = 100, level = 1, xp = 0, health = 200, cash = 1000, bank = 1000, position = JSON.stringify(DefaultSpawn), groups = JSON.stringify(DefaultGroups), created_at = new Date(), updated_at = new Date()) {
        return db.Character.create({
            user_id,
            character_name,
            age,
            sex,
            hunger,
            thirst,
            level,
            xp,
            health,
            cash,
            bank,
            position,
            groups,
            created_at,
            updated_at
        });
    }

    static async CreateModels(id, clothes, parent_data, feature_data, appearence_data, styles_data, created_at = new Date(), updated_at = new Date()) {
        return db.Characters_Model.create({
            id,
            clothes,
            parent_data,
            feature_data,
            appearence_data,
            styles_data,
            created_at,
            updated_at
        });
    }

}