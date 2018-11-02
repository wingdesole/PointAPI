const jwt_decode = require ('jwt-decode');

module.exports = function (req,res) {
    const token = req.header('x-auth-token');
    const myInfo = decoder(token);
    res.send(myInfo);
}