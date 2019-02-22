const router = require('express').Router();
const request = require('request');

const RestaurantBaseURL = 'http://localhost:3003';
// Verify token for all other endpoint

function getData(req) {
    const remainingPath = req.url.split('orders');

    if(req.method === 'get') {
        return request(`${RestaurantBaseURL}/${remainingPath}`);
    } else {
        return request({
            method: req.method,
            url: `${RestaurantBaseURL}/${remainingPath}`,
            body: req.body
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