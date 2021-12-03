// 'use strict';

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const favoriteSchema = new Schema({
//   article: { type: mongoose.Types.ObjectId, ref: 'Article', unique: true },
//   user: { type: mongoose.Types.ObjectId, ref: 'User' }

// });

// const Favorite = mongoose.model('favorite', favoriteSchema);
// module.exports = Favorite;

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
