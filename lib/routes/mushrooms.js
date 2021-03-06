// ROUTE
const Shroom = require('../models/mushroom');
const notFound = require('./not-found');

const get = (req, res) =>{
    if(req.id) {
        Shroom.selectOne(req.id)
            .then(shroom => {
                if(!shroom) notFound(req, res);
                else res.send(shroom);
            });
    }
    else {
        Shroom.selectAll()
            .then(shrooms => res.send(shrooms));
    }
};

const post = (req, res) => {
    Shroom.insert(req.body)
        .then(shroom => res.send(shroom));
};

const methods = { get, post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};