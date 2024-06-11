module.exports = (sequelize, dataTypes) => {
  let alias = "users";
  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username:{
      type: dataTypes.STRING(255),
      allowNull: false
    },
    lastname:{
      type: dataTypes.STRING(255),
      allowNull: false
    },
    email:{
      type: dataTypes.STRING(255),
      allowNull: false
    },
    userpassword:{
      type: dataTypes.STRING(255),
      allowNull: false
    },
    ocupacion:{
      type: dataTypes.STRING(255),
    },
    bio:{
      type: dataTypes.STRING(700),
    },
    perfil_activo:{
      type: dataTypes.INTEGER,
    }
  }
  let config = {
    tableName: "users",
    timestamps: false
  }
  const users = sequelize.define(alias, cols, config);
  users.associate = function(models){
    users.hasOne(models.article,{
      as: "article",
      foreignKey: "author_id"
    })

    users.hasOne(models.galery,{
      as: "perfil_picture",
      foreignKey: "imgprofile_id"
    })
  }
  return users;
}
