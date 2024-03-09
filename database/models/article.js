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
        image_url:{
            type: dataTypes.STRING(100)
        },
        contenido:{
            type: dataTypes.STRING(10000)
        },
        fecha_publicacion:{
            type: dataTypes.DATE,
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