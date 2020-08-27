'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('characters_model', {
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('characters_model');
    }
};