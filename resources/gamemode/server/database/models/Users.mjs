import Sequelize from 'sequelize'

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
	  type: Sequelize.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	  allowNull: false,
	},
	name: {
	  type: Sequelize.STRING,
	  allowNull: false,
	},
	password: {
	  type: Sequelize.STRING,
	  allowNull: false,
	},
	email: {
	  type: Sequelize.STRING,
	  allowNull: false,
	},
	whitelisted: {
	  type: Sequelize.INTEGER,
	  allowNull: true,
	  defaultValue: 0,
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
    timestamps: false,
    modelName: 'Users',
    tableName: 'users',
  });

  return Users;
};
