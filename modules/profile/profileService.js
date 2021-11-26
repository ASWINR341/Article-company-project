'use strict';
const User = require('../../models/user');

exports.getUsers = () => {
  return User.find();
};

// exports.getFollowers = (_id) => {
//   return User.findById(_id).populate('followers', '-_id -password -following -followers -__v').select("-password -following -__v -_id");
// };

exports.getFollowers = (_id) => {
  console.log(_id);
  return User.aggregate([
    {
      $match: {
        _id: _id
      }
    }, {
      $unwind: '$followers'
    }, {
      $lookup: {
        from: 'users',
        localField: 'followers',
        foreignField: '_id',
        as: 'user'
      }
    }, {
      $project: {
        _id: {
          $arrayElemAt: ['$user._id', 0]
        },
        email: {
          $arrayElemAt: ['$user.email', 0]
        },
        name: {
          $arrayElemAt: ['$user.name', 0]
        }
      }
    }]);
};

exports.update = (user) => {
  return User.updateOne({ _id: user._id }, { name: user.name, image: user.image, bio: user.bio });
};

exports.followers = (user) => {
  return User.findByIdAndUpdate(user.followId,
    { $push: { followers: user._id } }
  );
};

exports.following = (user) => {
  return User.findByIdAndUpdate(user._id,
    { $push: { following: user.followId } });
};

exports.unfollowers = (user) => {
  return User.findByIdAndUpdate(user.followId,
    { $pull: { followers: user._id } });
};

exports.unfollowing = (user) => {
  return User.findByIdAndUpdate(user._id,
    { $pull: { following: user.followId } });
};
