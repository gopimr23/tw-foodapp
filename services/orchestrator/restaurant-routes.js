const router = require('express').Router();
const request = require('request');
const uuid = require('uuid');

const RestaurantBaseURL = 'http://localhost:3002';
// Verify token for all other endpoint

function promiseRequest(params) {
    console.log(params.url);
    return new Promise((resolve, reject) => {
        request(params, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

function  getData(req) {
    console.log('remainingPath', req.url);
    req.headers.traceId = uuid.v4();
    req.headers.spanId = uuid.v4();

    console.log(req.method);
    if(req.method === 'GET') {
        console.log('method - --', req.method);
        return promiseRequest({
            method: req.method,
            url: `${RestaurantBaseURL}${req.url}`,
            headers: req.headers
        });
    } else {
        return promiseRequest({
            method: req.method,
            url: `${RestaurantBaseURL}${req.url}`,
            body: req.body
        });
    }
}

router.use((req, res) => {
    console.log('in req');
    getData(req)
        .then((res) => {
            res.status(200).send(res);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});


module.exports = router;