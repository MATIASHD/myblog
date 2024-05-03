const { Sequelize } = require("sequelize");
const usuario = require('./users');
const article = Sequelize.define('article', {
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
    type: dataTypes.DATE()
  },
  img:{
    type: dataTypes.STRING(255),
    allowNull: false
  }
},
{
  tableName: "article",
  timestamps: false
})

article.belongsTo(usuario, {foreignKey: 'author_id', as: 'users'});
module.exports = article;