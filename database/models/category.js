module.exports = (sequelize, dataTypes) => {
    let alias = "category";
    let cols = {
        idcategory:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_name:{
            type: dataTypes.STRING(100),
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