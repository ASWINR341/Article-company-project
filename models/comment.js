// 'use strict';

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const commentSchema = new Schema({
//   article: { type: mongoose.Types.ObjectId, ref: 'Article' },
//   message: String,
//   user: { type: mongoose.Types.ObjectId, ref: 'User' }

// });

// const Comment = mongoose.model('comment', commentSchema);
// module.exports = Comment;

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
