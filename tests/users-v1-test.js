const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../app')
chai.use(chaiHttp)
chai.should() // Pour pouvoir utiliser should

describe("Users tests", () => {
    it("should list ALL users on /v1/users GET", (done) => {
        chai
            .request(app)
            .get("/v1/users")
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a("array")
                done()
            })
    })
    it("should list a SINGLE user on /v1/users/<id> GET", (done) => {
        chai
            .request(app)
            .get("/v1/users/987sd88a-45q6-78d8-4565-2d42b21b1a3e")
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a("object")
                res.body.should.have.property("id")
                res.body.id.should.equal("987sd88a-45q6-78d8-4565-2d42b21b1a3e")
                done()
            })
    })
    it("should add a SINGLE user on /v1/users POST", (done) => {
        chai
            .request(app)
            .post("/v1/users")
            .send({ name: "Charles", login: "charly", age: 19 })
            .end((err, res) => {
                res.should.have.status(201)
                res.should.be.json
                res.body.should.be.a("object")
                res.body.should.have.property("id")
                res.body.should.have.property("name")
                res.body.name.should.equal("Charles")
                res.body.login.should.equal("charly")
                res.body.age.should.equal(19)
                done()
            })
    })
    it("should update a SINGLE user on /v1/users/<id> PATCH", (done) => {
        chai
            .request(app)
            .patch("/v1/users/987sd88a-45q6-78d8-4565-2d42b21b1a3e")
            .send({ name: "Frigue Feulé", age: 30 })
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a("object")
                res.body.should.have.property("id")
                res.body.id.should.equal("987sd88a-45q6-78d8-4565-2d42b21b1a3e")
                res.body.name.should.equal("Frigue Feulé")
                res.body.login.should.equal("rigo")
                res.body.age.should.equal(30)
                done()
            })
    })
    it("should delete a SINGLE user on /v1/users/<id> DELETE", (done) => {
        chai
            .request(app)
            .delete("/v1/users/987sd88a-45q6-78d8-4565-2d42b21b1a3e")
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})