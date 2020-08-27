import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
    const Characters_Model = sequelize.define('Characters_Model', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: { model: 'characters', key: 'id' },
            allowNull: false,
        },
        clothes: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
        },
        parent_data: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
        },
        feature_data: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
        },
        appearence_data: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
        },
        styles_data: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: '{}'
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
        modelName: 'Characters_Model',
        tableName: 'characters_model',
    });

    return Characters_Model;
};