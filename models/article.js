// 'use strict';

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const articleSchema = new Schema({
//   user: { type: mongoose.Types.ObjectId, ref: 'User' },
//   title: {
//     type: String,
//     unique: true
//   },
//   description: String,
//   bodypara: String
// });

// const Article = mongoose.model('article', articleSchema);
// module.exports = Article;

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bodypara: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Article.associate = function (models) {
    models.article.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.article.hasMany(models.comment, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.article.hasMany(models.favorite, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Article;
};
