module.exports = (sequelize, dataTypes) => {
    let alias = "category";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: dataTypes.STRING(255),
            allowNull: false
        },
    };
    let config = {
        tableName: "category",
        timestamps: false
    }
    const category = sequelize.define(alias, cols, config);
    return category;
}
