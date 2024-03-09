module.exports = (sequelize, dataTypes) => {
    let alias = "tags";
    let cols = {
        id_tags:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tags_name:{
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: "tags",
        timestamps: false
    }
    const tags = sequelize.define(alias, cols, config);
    return tags;
}