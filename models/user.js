'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    }
  });
  User.associate = function (models) {
    models.user.hasMany(models.article, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.user.hasMany(models.comment, {
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
    models.user.hasMany(models.follow, {
      as: "follower",
      onDelete: 'CASCADE',
      foreignKey: {
        name: "followerId",
        allowNull: false
      }
    });
    models.user.hasMany(models.follow, {
      as: "following",
      onDelete: 'CASCADE',
      foreignKey: {
        name: "followingId",
        allowNull: false
      }
    });
  };
  return User;
};
