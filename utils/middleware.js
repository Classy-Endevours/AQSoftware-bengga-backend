const crypto = require('crypto');
const qs = require('qs');

exports.hashMiddleware = () => {
    return function (req, res, next) {  
        let request_body;
        if(req.method === "GET") {
            request_body = qs.stringify(req.query)
        } else {
            request_body = JSON.stringify(req.body)
        }
        let  signature = req.headers["x-hash-signature"];
        if (signature === undefined) {
            return res.status(400).send("Forbidden")
        }
        else {
            const hash = crypto.createHmac('sha256', process.env.jwt_token_signing_key)
                                    .update(request_body, 'utf8')
                                    .digest('hex');
            if (crypto.timingSafeEqual(Buffer.from(hash, 'utf8'), Buffer.from(signature, 'utf8'))) {
                next();
            } else {
                return res.status(400).send("Forbidden") 
            }
        }
    }        
}