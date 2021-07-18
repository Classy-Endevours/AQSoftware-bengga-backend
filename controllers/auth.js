const jwt = require('jsonwebtoken');
const models = require('../models/index.js');
const Sequelize = require('sequelize');
const User = models.User;

const validator = require('../validations/validator');

exports.login = async (req, res) => {
    const { error } = validator.validateLogin(req.body);
	// Check Input Validation
	if (error) {
		return res.status(400).json({ 
			success: false, 
			errors: {
				message: error.details[0].message
			} 
		});
    } else {
        const data = await User.findOne({
            where: Sequelize.literal(`api_key = "${req.body.apiKey}" and old_id = UUID_TO_BIN("${req.body.oldId}",true)`)
        ,attributes: ['old_id','id']})
        if(!data) {
            return res.status(400).send("Invalid credentials")
        }
        const token = jwt.sign({
            id: data.id,
            oldId: req.body.oldId
        },
            process.env.jwt_token_signing_key,
            {
                expiresIn: process.env.jwt_access_token_expiration_time,
                issuer: process.env.jwt_token_issuer
            }
        );
        res.header("Authorization",`Bearer ${token}`)
        return res.status(200).send({message: "Logged in Successfully"})
    }
};