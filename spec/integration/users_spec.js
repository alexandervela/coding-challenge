const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const Wall = require("../../src/db/models").Wall;
const Comment = require("../../src/db/models").Comment;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("GET /users/sign_up", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign Up");
        done();
      });
    });

  });

  describe("POST /users", () => {

    it("should create a new user with valid values and redirect", (done) => {
    
      const options = {
        url: base,
        form: {
          username: "coolkid",
          password: "123456789"
        }
      }
    
      request.post(options,
        (err, res, body) => {
          User.findOne({where: {username: "coolkid"}})
          .then((user) => {
            expect(user).not.toBeNull();
            expect(user.username).toBe("coolkid");
            expect(user.id).toBe(1);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post(
        {
          url: base,
          form: {
            username: "a",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({where: {username: "a"}})
          .then((user) => {
            expect(user).toBeNull();
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

  describe("GET /users/sign_in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign In");
        done();
      });
    });

  });

  /*
  describe("GET /users/:id", () => {

    beforeEach((done) => {
      this.user;
      this.wall;
      this.comment;

      User.create({
        username: "coolguy",
        password: "123456789"
      })
      .then((res) => {
        this.user = res;

        Wall.create({
          title: "Alex's Wall",
          description: "Ask me anything",
          comments: [{
            username: "othercoolguy",
            body: "What's your favrotie food brah?",
            wallId: this.wall.id
          }]
        }, {
          include: {
            model: Comment,
            as: "comments"
          }
        })
        .then((res) => {
          this.comment = res.comments[0];
          done();
        })
      })

    });

    it("should present a list of comments a user has created", (done) => {

      request.get(`${base}${this.user.id}`, (err, res, body) => {
        expect(body).toContain("What's your favrotie food brah?")
        done();
      });

    });
  });
  */

});