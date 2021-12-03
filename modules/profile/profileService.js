'use strict';
// const { Sequelize } = require('sequelize/dist');
// const User = require('../../models/user');
const models = require('../../models');

// exports.getUsers = () => {
//   return User.find();
// };
exports.getUsers = () => {
  return models.user.findAll();
};

// exports.getFollowers = (_id) => {
//   return User.findById(_id).populate('followers', '-_id -password -following -followers -__v').select("-password -following -__v -_id");
// };

// exports.getFollowers = (_id) => {
//   console.log(_id);
//   return User.aggregate([
//     {
//       $match: {
//         _id: _id
//       }
//     }, {
//       $unwind: '$followers'
//     }, {
//       $lookup: {
//         from: 'users',
//         localField: 'followers',
//         foreignField: '_id',
//         as: 'user'
//       }
//     }, {
//       $project: {
//         _id: {
//           $arrayElemAt: ['$user._id', 0]
//         },
//         email: {
//           $arrayElemAt: ['$user.email', 0]
//         },
//         name: {
//           $arrayElemAt: ['$user.name', 0]
//         }
//       }
//     }]);
// };
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

// attributes: [[Sequelize.literal(' "follower"."id"')],
// [Sequelize.literal(' "follower"."name"')],
// [Sequelize.literal(' "follower"."email"')]
// ]

// exports.update = (user) => {
//   return User.updateOne({ _id: user._id }, { name: user.name, image: user.image, bio: user.bio });
// };
exports.update = (user) => {
  return models.user.update({ name: user.name, image: user.image, bio: user.bio }, { where: { id: user.id } });
};

// exports.followers = (user) => {
//   return User.findByIdAndUpdate(user.followId,
//     { $push: { followers: user._id } }
//   );
// };
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

// exports.following = (user) => {
//   return User.findByIdAndUpdate(user._id,
//     { $push: { following: user.followId } });
// };

// exports.unfollowers = (user) => {
//   return User.findByIdAndUpdate(user.followId,
//     { $pull: { followers: user._id } });
// };

// exports.unfollowing = (user) => {
//   return User.findByIdAndUpdate(user._id,
//     { $pull: { following: user.followId } });
// };
