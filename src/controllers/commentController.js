const commentQueries = require("../db/queries.comments.js");

module.exports = {
    new(req, res, next){
        res.render("comments/new", {wallId: req.params.wallId});
    },
    create(req, res, next){
      let newComment= {
        username: req.body.username,
        body: req.body.body,
        wallId: req.params.wallId
      };
      commentQueries.addComment(newComment, (err, comment) => {
        if(err){
          res.redirect(500, "/comments/new");
        } else {
          res.redirect(303, `/walls/${newComment.wallId}/comments/${comment.id}`);
        }
      });
    },
    show(req, res, next){
      commentQueries.getComment(req.params.id, (err, comment) => {
        if(err || comment == null){
          res.redirect(404, "/");
        } else {
          res.render("comments/show", {comment});
        }
      });
    }
}