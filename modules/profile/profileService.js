'use strict';

const models = require('../../models');

exports.getUsers = () => {
  return models.user.findAll();
};

exports.getFollowers = (id) => {
  return models.follow.findAll(
    {
      include: [{
        model: models.user,
        as: 'follower',
        attributes: []
      }],
      where: {
        followingId: id
      },
      attributes: [[models.Sequelize.literal('follower.id'), 'id'],
        [models.Sequelize.literal('follower.name'), 'name'],
        [models.Sequelize.literal('follower.email'), 'email']
      ]

    });
};

exports.update = (user) => {
  return models.user.update({ name: user.name, image: user.image, bio: user.bio }, { where: { id: user.id } });
};

exports.ifFollow = (followerId, followingId) => {
  return models.follow.findOne({
    where: {
      followerId, followingId
    }
  });
};

exports.follow = (user) => {
  return models.follow.create(
    user
  );
};

exports.unfollow = (user) => {
  return models.follow.destroy({
    where: {
      followerId: user.followerId,
      followingId: user.followingId
    }
  }
  );
};
