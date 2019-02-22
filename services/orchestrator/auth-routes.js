const request = require('request');

const BASE_URL = "http://localhost:3001";

function login(req, res) {
    return request({
        method: 'post',
        url: `${BASE_URL}/login`,
        body: req.body,
        headers: req.headers
    }).then((res) => {
        res.status(200).send(res);
    })
        .catch((err) => {
            res.status(500).send(err);
        });
}

function logout(req, res) {
    return request({
        method: 'post',
        url: `${BASE_URL}/logout`,
        body: req.body,
        headers: req.headers
    }).then((res) => {
        res.status(200).send(res);
    })
        .catch((err) => {
            res.status(500).send(err);
        });
}

function signup(req, res) {
    return request({
        method: 'post',
        url: `${BASE_URL}/signup`,
        body: req.body,
        headers: req.headers
    }).then((res) => {
        res.status(200).send(res);
    })
        .catch((err) => {
            res.status(500).send(err);
        });
}

module.exports = {
    login,
    logout,
    signup
};