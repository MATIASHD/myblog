module.exports = (sequelize, dataTypes) => {
  let alias= "article";
  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title:{
      type: dataTypes.STRING(255),
      allowNull: false
    },
    subtitle:{
      type: dataTypes.STRING(300),
      allowNull: false
    },
    content:{
      type: dataTypes.TEXT,
      allowNull: false
    },
    estract:{
      type: dataTypes.STRING(300)
    },
    author_id:{
      type: dataTypes.INTEGER
    },
    draft:{
      type: dataTypes.INTEGER
    },
    created_at:{
      type: dataTypes.DATEONLY()
    },
    img:{
      type: dataTypes.STRING(255),
      allowNull: false
    }
  }
  let config = {
    tableName: "article",
    timestamps: false
  }
  const article = sequelize.define(alias, cols, config);
  article.associate = function(models){
    article.belongsToMany(models.category,{
      as: "tags",
      through: "articulotags",
      foreignKey: "article_id",
      otherKey: "tags_id",
      timestamps: false
    })

    article.belongsTo(models.users,{
      as: "author",
      foreignKey: "author_id"
    })

    article.belongsToMany(models.galery,{
      as: "media",
      through: "articulomedia",
      foreignKey: "article_id",
      otherKey: "media_id",
      timestamps: false
    })
  }
  return article;
}
