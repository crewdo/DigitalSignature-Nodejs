const keyconfig = require('../config/config');
const crypto = require('crypto');

exports.generateSignature = function (req,res) {
    let message = req.body.message || {};
    keyconfig.set('message', message);

    let messageBuff = Buffer.from(message);
    let signature = crypto.privateEncrypt(keyconfig.get('privatekey'), messageBuff).toString('base64');
    keyconfig.set('signature', signature);


    res.send(signature);
};

exports.checkMessage = function (req, res) {
    let message = req.body.message || {};
    let signature =   req.body.signature || {};
    let signatureBuff = Buffer.from(signature, 'base64');
    let publickey = req.body.publickey || {};
    try {

        var verifyMessage = crypto.publicDecrypt(publickey, signatureBuff).toString('utf8');
    }
    catch (e) {
        console.log('fail');
    }

    if(verifyMessage !== message){
        res.send('<h3 style="color:red">Unverified!</h3>')
    }
    else  res.send('<h3 style="color:lawngreen">Verified!</h3>');

};

