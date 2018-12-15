module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const wallRoutes = require("../routes/walls");
      const commentRoutes = require("../routes/comments");
      const userRoutes = require("../routes/users");

      app.use(staticRoutes);
      app.use(wallRoutes);
      app.use(commentRoutes);
      app.use(userRoutes);
    }
  }