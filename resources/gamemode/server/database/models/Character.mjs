import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
    const Character = sequelize.define('Character', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            allowNull: false,
        },
        character_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        xp: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        health: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 200,
        },
        cash: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        bank: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        position: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
        },
        groups: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
        },
        sex: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hunger: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 100
        },
        thirst: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 100
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'Character',
        tableName: 'characters',
    });

    return Character;
};