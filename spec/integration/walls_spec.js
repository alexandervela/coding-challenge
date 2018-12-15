const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/walls/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wall = require("../../src/db/models").Wall;

describe("routes : walls", () => {

  beforeEach((done) => {
    this.wall;
    sequelize.sync({force: true}).then((res) => {

     Wall.create({
       title: "My first wall",
       description: "Ask me anything!"
     })
      .then((wall) => {
        this.wall = wall;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /walls", () => {

    it("should return a status code 200 and all walls", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Walls");
          expect(body).toContain("My first wall");
          
          done();
        });
    });
  });

  describe("GET /walls/new", () => {

    it("should render a new wall form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Wall");
        done();
      });
    });

  });

  describe("POST /walls/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Alex's wall",
        description: "Have any questions?"
      }
    };

    it("should create a new wall and redirect", (done) => {
      request.post(options,
        (err, res, body) => {
          Wall.findOne({where: {title: "Alex's wall"}})
          .then((wall) => {
            expect(res.statusCode).toBe(303);
            expect(wall.title).toBe("Alex's wall");
            expect(wall.description).toBe("Have any questions?");
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

  describe("GET /walls/:id", () => {

    it("should render a view with the selected wall", (done) => {
      request.get(`${base}${this.wall.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("My first wall");
        done();
      });
    });

  });

});