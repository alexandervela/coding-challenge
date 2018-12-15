const Comment = require("./models").Comment;
const Wall = require("./models").Wall;

module.exports = {
    addComment(newComment, callback){
        return Comment.create(newComment)
        .then((comment) => {
          callback(null, comment);
        })
        .catch((err) => {
          callback(err);
        })
    },
    getComment(id, callback){
      return Comment.findById(id)
      .then((comment) => {
        callback(null, comment);
      })
      .catch((err) => {
        callback(err);
      })
    }
}