const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Your Sequelize instance

const Promotion = sequelize.define(
	"Promotion",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		subTitle: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		footNote: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		imageId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		href: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		contentStatusId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		textContent: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		contentStatusId: {
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
		tableName: "promotion",
		timestamps: false,
	}
);

module.exports = Promotion;
