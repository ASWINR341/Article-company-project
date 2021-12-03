'use strict';

module.exports = (sequelize) => {
  const Favorite = sequelize.define('favorite', {});
  Favorite.associate = function (models) {
    models.favorite.belongsTo(models.article, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.favorite.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Favorite;
};
