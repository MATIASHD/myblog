module.exports = (sequelize, dataTypes) => {
    let alias = "users";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: dataTypes.STRING(70),
            allowNull: false
        },
        nick:{
            type: dataTypes.STRING(70),
            allowNull: false
        },
        bio:{
            type: dataTypes.STRING(3000),
        },
        email:{
            type: dataTypes.STRING(150),
            allowNull: false
        },
        contrasenia:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(70)
        },
        surname:{
            type: dataTypes.STRING(70),
            allowNull: false
        },
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    const users = sequelize.define(alias, cols, config);
    return users;
}