'use strict';

module.exports = (sequelize) => {
  const Follow = sequelize.define('follow', {});
  Follow.associate = function (models) {
    models.follow.belongsTo(models.user, {
      as: "follower",
      onDelete: 'CASCADE',
      foreignKey: {
        name: "followerId",
        allowNull: false
      }
    });
    models.follow.belongsTo(models.user, {
      as: "following",
      onDelete: 'CASCADE',
      foreignKey: {
        name: "followingId",
        allowNull: false
      }
    });
  };
  return Follow;
};
