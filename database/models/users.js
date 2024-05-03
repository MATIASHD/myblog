const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const article = require('./article');
const users = Sequelize.define('users',{
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastname:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userpassword:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userimg:{
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },{
    tableName: "users",
    timestamps: false
  });

  users.hasOne(article, { foreignKey: 'author_id', as: 'article' });
  module.exports = users;