const { Sequelize } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = "article";
    let cols = {
        idarticle:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: dataTypes.STRING(200)
        },
        subtitle:{
            type: dataTypes.STRING(500)
        },
        image_url:{
            type: dataTypes.STRING(100)
        },
        contenido:{
            type: dataTypes.TEXT,
            allowNull: false
        },
        fecha_publicacion:{
            type: dataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        author:{
            type: dataTypes.STRING(45)
        },
        category:{
            type: dataTypes.INTEGER
        },
        tags:{
            type: dataTypes.INTEGER
        },
        like:{
            type: dataTypes.INTEGER
        }

    };
    let config = {
        tableName: "article",
        timestamps: false
    }
    const article = sequelize.define(alias, cols, config);
    return article;
}