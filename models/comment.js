'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Comment.associate = function (models) {
    models.comment.belongsTo(models.article, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.comment.belongsTo(models.user, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
