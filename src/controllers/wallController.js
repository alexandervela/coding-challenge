const wallQueries = require("../db/queries.walls.js");

module.exports = {

    index(req, res, next){
      wallQueries.getAllWalls((err, walls) => {
          if(err){
            res.redirect(500, "static/index");
          } else {
            res.render("walls/index", {walls});
          }
      })
    },
    new(req, res, next){
      res.render("walls/new");
    },
    create(req, res, next){
      let newWall = {
        title: req.body.title,
        description: req.body.description
      };
      wallQueries.addWall(newWall, (err, wall) => {
        if(err){
          res.redirect(500, "/walls/new");
        } else {
          res.redirect(303, `/walls/${wall.id}`);
        }
      });
    },
    show(req, res, next){
      wallQueries.getWall(req.params.id, (err, wall) => {
        if(err || wall == null){
          res.redirect(404, "/");
        } else {
          res.render("walls/show", {wall});
        }
      });
    }
  }