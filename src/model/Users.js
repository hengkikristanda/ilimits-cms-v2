/* const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const Users = sequelize.define(
	"users",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		emailAddress: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		encodedPassword: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		userRoleId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		imageId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		modifiedAt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		modifiedBy: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "users",
		timestamps: false,
	}
);

module.exports = Users;
 */