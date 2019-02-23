const router = require('express').Router();
const request = require('request');
const uuid = require('uuid');

const RestaurantBaseURL = 'http://localhost:3003';
// Verify token for all other endpoint

function getData(req) {
    const remainingPath = req.url.split('orders')[1];

    if(req.method === 'get') {
        return request({
            method: req.method,
            url: `${RestaurantBaseURL}/${remainingPath}`,
            headers: {
                token: req.headers.token
            }
        });
    } else {
        return request({
            method: req.method,
            url: `${RestaurantBaseURL}/${remainingPath}`,
            body: req.body,
            headers: {
                token: req.headers.token
            }
        });
    }
}

router.use((req, res) => {
    getData(req)
        .then((res) => {
            res.status(200).send(res);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});


module.exports = router;