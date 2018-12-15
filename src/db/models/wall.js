'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wall = sequelize.define('Wall', {
    title: {
       type: DataTypes.STRING,
       allowNull: false
      },
    description: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Wall.associate = function(models) {
    Wall.hasMany(models.Comment, {
      foreignKey: "wallId",
      as: "comments"
    });
  };
  return Wall;
};