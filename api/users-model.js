const db = require('../data/db-config')

module.exports = {
    add,
    update,
    remove,
    getAll,
    findById
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => id)
}

function update(id, changes) {

}

function remove(id) {
    return db('users')
        .where({ id })
        .del()
}

function getAll() {
    return db('users')
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}