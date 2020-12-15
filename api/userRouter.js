const router = require('express').Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
	Users.getAll().then((users) => res.json(users));
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Users.findById(id).then((user) => res.json(user));
});

router.post('/', (req, res) => {
	const { name } = req.body;
	Users.insert({ name }).then((id) => res.status(201).json(id));
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Users.remove(id).then(() => res.status(204).send());
});

module.exports = router;
