const request = require('request');
const uuid = require('uuid');

function callPaymentService(req) {
    const spanId = uuid.v4();

    console.log({
        serviceName: 'payment-service',
        time: new Date().toISOString(),
        traceId: req.headers.traceId,
        fromSpanId: req.headers.spanId,
        spanId: spanId,
        message: 'start payment'
    });

    return request({
        method: 'post',
        url: 'http://localhost:3004/pay',
        headers: {
            token: req.headers.token,
            traceId: req.headers.traceId,
            fromSpanId: req.headers.spanId,
            spanId: spanId
        }
    });
}

class OrderController {
    static verifyOrder(req, res) {
        // call SBI or some back service
        console.log({
            serviceName: 'order-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            fromSpanId: req.headers.spanId,
            message: 'Verify the order from user'
        });

        mockBankAPICall(req)
            .then(() => {
                res.status(200).send({
                    message: "Bank payment success"
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Order processing error",
                    err
                });
            });
    }

    static checkoutOrder(req, res) {
        // call SBI or some back service
        console.log({
            serviceName: 'order-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            spanId: req.headers.spanId,
            message: 'Checkout the order'
        });

        mockBankAPICall(req)
            .then(() => {
                return callPaymentService(req);
            })
            .then(() => {
                res.status(200).send({
                    message: "order success"
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Order processing error",
                    err
                });
            });
    }
}

module.exports = OrderController;