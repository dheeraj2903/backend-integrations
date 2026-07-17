const request = require("supertest")
const app = require('../app');

describe("GET /", () => {

    it('should return 200 and Hello world message', async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", 'Hello world')
    })
})


describe("POST /api.auth/register", () => {
    it("should register a user and return 201 with user data", async () => {

        const res = await request(app).post("/api/auth/register").send({
            username: "testuser",
            email: 'test@test.com',
            password: "password123"
        })

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message","User registered successfully");
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("username", "testuser");
        expect(res.body.user).toHaveProperty("email", "test@test.com");
    })
})