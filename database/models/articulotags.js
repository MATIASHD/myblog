const { Sequelize } = require("sequelize");

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
  return articulotags;
}
