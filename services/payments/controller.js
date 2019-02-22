function mockBankAPICall() {

}

class paymentController {
    static payForTheOrder(req, res) {
        // call SBI or some back service

        mockBankAPICall();
    }
}
module.exports = paymentController;