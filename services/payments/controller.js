class paymentController {
    static payForTheOrder(req, res) {
        // call SBI or some back service
        console.log({
            serviceName: 'payment-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            fromSpanId: req.headers.spanId,
            message: 'start payment'
        });

        mockBankAPICall(req)
            .then(() => {
                return callPaymentService();
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

function mockBankAPICall() {
    return Promise.resolve();
}

module.exports = paymentController;