const { INTEGER } = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        cognome: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        pwd: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        corso_interesse: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    })


    return Users
}