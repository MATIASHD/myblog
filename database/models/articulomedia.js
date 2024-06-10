module.exports = (sequelize, dataTypes) => {
  let alias = "articulomedia";
  let cols = {
    media_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    article_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    }
  };
  let config = {
    tableName: "articulomedia",
    timestamps: false
  }
  const articulomedia = sequelize.define(alias, cols, config);

  articulomedia.associate = function(models){
    articulomedia.belongsTo(models.galery,{
      foreignKey: "media_id"
    })

    articulomedia.belongsTo(models.article,{
      foreignKey: "article_id"
    })
  }
  return articulomedia;
}
