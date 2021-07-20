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
                to: "+918087840466",
            });
            resolve(response);
        } catch (error) {
            reject(error);
            console.log({ error });
        }
    });

exports.generateOTP = () => Math.floor(100000 + Math.random() * 900000);
