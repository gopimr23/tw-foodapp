function mockBankAPICall() {
    return Promise.resolve();
}

class paymentController {
    static payForTheOrder(req, res) {
        // call SBI or some back service

        mockBankAPICall(req)
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
module.exports = paymentController;