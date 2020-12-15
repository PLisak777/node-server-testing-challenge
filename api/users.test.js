const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config');

beforeAll(() => db.seed.run());

describe('GET /api/users', () => {
	test('returns 200', () => {
		return request(server)
			.get('/api/users')
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});
	test('returns list of all users', () => {
		return request(server)
			.get('/api/users')
			.then((res) => {
				expect(res.body.length).toBe(4);
			});
	});
});

describe('GET /api/users/:id', () => {
	test('returns user with specified id', () => {
		return request(server)
			.get('/api/users/1')
			.then((res) => {
				expect(res.body.name).toBe('Bob');
			});
	});
	test('returns 200 from server', () => {
		return request(server)
			.get('/api/users/1')
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});
});

describe('POST /api/users', () => {
	test('returns 201', () => {
		return request(server)
			.post('/api/users')
			.send({ name: 'Jack' })
			.then((res) => {
				expect(res.status).toBe(201);
			});
    });
    test('returns new user id to client', async () => {
        const res = await request(server).post('/api/users').send({ name: 'Jack' })
        const id = res.body;
        expect(typeof id).toBe('number')
    })
    test('creates new user', async () => {
        const res = await request(server).post('/api/users').send({ name: 'Jack' })
        const id = res.body;
        const newUser = await db('users').where({ id }).first()
        expect(newUser.name).toBe('Jack')
    })
    test('deletes user with specified id', async () => {
        const user = await db('users').where({ id: 1 })
        expect(user.length).toBe(0)
    })
});
