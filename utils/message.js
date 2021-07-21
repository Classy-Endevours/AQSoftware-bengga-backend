const moment = require('moment');
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    { accountSid: "AC" }
);

exports.sendOTP = (body, to) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await client.messages.create({
                body: "HI",
                from: process.env.TWILIO_FROM,
                to: "+918652507623",
            });
            resolve(response);
        } catch (error) {
            reject(error);
            console.log({ error });
        }
    });

exports.generateOTP = () => ({
    code: Math.floor(100000 + Math.random() * 900000),
    expire:  moment(new Date()).add(6, 'm').toDate(),
});
