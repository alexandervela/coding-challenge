const Wall = require("./models").Wall;
const Comment = require("./models").Comment;

module.exports = {

  getAllWalls(callback){
    return Wall.all()
    .then((walls) => {
      callback(null, walls);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addWall(newWall, callback){
    return Wall.create({
      title: newWall.title,
      description: newWall.description
    })
    .then((wall) => {
      callback(null, wall);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getWall(id, callback){
    return Wall.findById(id, {
            include: [{
              model: Comment,
              as: "comments"
            }]
          })
    .then((wall) => {
      callback(null, wall);
    })
    .catch((err) => {
      callback(err);
    })
  }
  
}