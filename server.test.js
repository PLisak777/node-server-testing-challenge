const request = require('supertest');
const server = require('./server');
const db = require('./data/db-config');

describe('server.js', () => {
	test('GET / returns 200', () => {
		return request(server)
			.get('/')
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});
});
