'use strict';

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
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
