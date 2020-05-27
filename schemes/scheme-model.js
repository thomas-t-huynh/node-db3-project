const db = require("../data/dbconfig")

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes').where({id})
}

function findSteps(id) {
    return db('schemes as sc')
        .join('steps as st', 'sc.id', 'st.scheme_id')
        .orderBy('step_number', 'asc')
        .select('sc.scheme_name', 'st.step_number', 'st.instructions')
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(ids => findById(ids[0]))
}

function update(changes, id) {
    return db('schemes').where({id}).update(changes).then(() => findById(id))
}

function remove(id) {
    return findById(id)
    .then(scheme => {
        return db('schemes').where({id}).del()
        .then(() => scheme)
    })
    .catch(() => null)
}