const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/walls";

const sequelize = require("../../src/db/models/index").sequelize;
const Wall = require("../../src/db/models").Wall;
const Comment = require("../../src/db/models").Comment;

describe("routes : comments", () => {

  beforeEach((done) => {
    this.wall;
    this.comment;

    sequelize.sync({force: true}).then((res) => {

      Wall.create({
        title: "My first wall",
        description: "Ask me anything!"
      })
      .then((wall) => {
        this.wall = wall;

        Comment.create({
          username: "awesomedude",
          body: "What's your favorite color?",
          wallId: this.wall.id
        })
        .then((comment) => {
          this.comment = comment;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /walls/:wallId/comments/new", () => {

    it("should render a new comment form", (done) => {
      request.get(`${base}/${this.wall.id}/comments/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Comment");
        done();
      });
    });

  });

  describe("POST /walls/:wallId/comments/create", () => {

    it("should create a new comment and redirect", (done) => {
       const options = {
         url: `${base}/${this.wall.id}/comments/create`,
         form: {
           username: "awesomeguy",
           body: "Do you have any pets?"
         }
       };
       request.post(options,
         (err, res, body) => {
 
           Comment.findOne({where: {username: "awesomeguy"}})
           .then((comment) => {
             expect(comment).not.toBeNull();
             expect(comment.username).toBe("awesomeguy");
             expect(comment.body).toBe("Do you have any pets?");
             expect(comment.wallId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
    });

    it("should not create a new comment that fails validations", (done) => {
      const options = {
        url: `${base}/${this.wall.id}/comments/create`,
        form: {
          username: "a",
          body: "b"
        }
      };

      request.post(options,
        (err, res, body) => {
          Comment.findOne({where: {username: "a"}})
          .then((comment) => {
              expect(comment).toBeNull();
              done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
 
  });

  describe("GET /walls/:wallId/comments/:id", () => {

    it("should render a view with the selected comment", (done) => {
      request.get(`${base}/${this.wall.id}/comments/${this.comment.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("awesomedude");
        done();
      });
    });

  });

});