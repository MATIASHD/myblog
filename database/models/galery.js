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
    }
  };
  let config = {
    tableName: "galery",
    timestamps: false
  }
  const article = sequelize.define(alias, cols, config);
  return article;
}
