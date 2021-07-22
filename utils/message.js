const moment = require("moment");
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

exports.sendOTP = (bodyMessage, numberToBeSent) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await client.messages.create({
                body: bodyMessage,
                messagingServiceSid: process.env.TWILIO_MESSAGE_SERVICE_ID,
                to: numberToBeSent
            });
            
            resolve(response);
        } catch (error) {
            reject(error);
            console.log({ error });
        }
    });

exports.generateOTP = () => ({
    code: Math.floor(100000 + Math.random() * 900000),
    expire: moment(new Date()).add(6, "m").toDate(),
});
