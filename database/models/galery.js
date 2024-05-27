module.exports = (sequelize, dataTypes) => {
  let alias= "galery";
  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    media:{
      type: dataTypes.STRING(255),
      allowNull: false
    },
    alt:{
      type: dataTypes.STRING(300),
      allowNull: false
    },
    figcaption:{
      type: dataTypes.STRING(300)
    },
    mediatype:{
      type: dataTypes.STRING(300),
    },
    imgprofile_id:{
      type: dataTypes.INTEGER,
    }
  };
  let config = {
    tableName: "galery",
    timestamps: false
  }
  const galery = sequelize.define(alias, cols, config);

  galery.associate = function(models) {
    galery.belongsToMany(models.article,{
      as: "article",
      through: "articulomedia",
      foreignKey: "media_id",
      otherKey: "article_id",
      timestamps: false
    })

    galery.belongsTo(models.users,{
      as: "user",
      foreignKey: "imgprofile_id"
    })
  }
  return galery;
}
