module.exports = (sequelize, dataTypes) => {
  let alias = "articulotags";
  let cols = {
    tags_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    },
    article_id:{
      type: dataTypes.INTEGER,
      allowNull: false
    }
  };
  let config = {
    tableName: "articulotags",
    timestamps: false
  }
  const articulotags = sequelize.define(alias, cols, config);

  articulotags.associate = function(models){
  articulotags.belongsTo(models.category,{
    foreignKey: "tags_id"
  })

  articulotags.belongsTo(models.article,{
    foreignKey: "article_id"
  })
}
  return articulotags;
}
