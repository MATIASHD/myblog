module.exports = (sequelize, dataTypes) => {
  let alias = "comentarios";
  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    article_id:{
      type: dataTypes.INTEGER,
    },
    user_id:{
      type: dataTypes.INTEGER,
    },
    content:{
      type: dataTypes.STRING(300),
    },
    created_at:{
      type: dataTypes.DATE()
    }
  };
  let config = {
      tableName: "comentarios",
      timestamps: false
  }
  const comentarios = sequelize.define(alias, cols, config);
  return comentarios;
}
