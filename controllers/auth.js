const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const short_uuid = require("short-uuid");
const models = require("../models/index.js");
const Sequelize = require("sequelize");
const User = models.User;

const validator = require("../validations/validator");

exports.login = async (req, res) => {
    const { error } = validator.validateLogin(req.body);
    // Check Input Validation
    if (error) {
        return res.status(400).json({
            success: false,
            errors: {
                message: error.details[0].message,
            },
        });
    } else {
        const data = await User.findOne({
            where: Sequelize.literal(
                `api_key = "${req.body.apiKey}" and old_id = UUID_TO_BIN("${req.body.oldId}",true)`
            ),
            attributes: ["old_id", "id"],
        });
        if (!data) {
            return res.status(400).send("Invalid credentials");
        }
        const token = jwt.sign(
            {
                id: data.id,
                oldId: req.body.oldId,
            },
            process.env.jwt_token_signing_key,
            {
                expiresIn: process.env.jwt_access_token_expiration_time,
                issuer: process.env.jwt_token_issuer,
            }
        );
        res.header("Authorization", `Bearer ${token}`);
        return res.status(200).send({ message: "Logged in Successfully" });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { error } = validator.validateRegistration(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                errors: {
                    message: error.details[0].message,
                },
            });
        }
        const {
            firstname,
            lastname,
            display_name,
            avatar_big,
            avatar_small,
            referred_by_id,
        } = req.body;

        const old_id = uuidv4();
        const api_key = short_uuid.generate();
        const user_type = 0;
        const newOldId = await models.sequelize.query(
            `select uuid_to_bin("${old_id}", true) as oid`
        );
        const user = await User.create({
            firstname,
            lastname,
            display_name,
            avatar_big,
            avatar_small,
            referred_by_id,
            old_id: newOldId[0][0]?.oid,
            api_key,
            user_type,
            create_date: new Date(),
            last_modified_date: new Date(),
        });
        const token = jwt.sign(
            {
                id: user.id,
                oldId: old_id,
            },
            process.env.jwt_token_signing_key,
            {
                expiresIn: process.env.jwt_access_token_expiration_time,
                issuer: process.env.jwt_token_issuer,
            }
        );
        res.header("Authorization", `Bearer ${token}`);
        return res.status(200).send({ message: "Register successful!" });
    } catch (error) {
        console.error({ error });
        return res.status(500).send({ message: "Internal Server Error!" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { error } = validator.validateUpdateProfile(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                errors: {
                    message: error.details[0].message,
                },
            });
        }
        const {
            firstname,
            lastname,
            display_name,
            avatar_big,
            avatar_small,
            id,
        } = req.body;

        const user = await User.findByPk(id);
        if (user) {
            await user.update({
                firstname,
                lastname,
                display_name,
                avatar_big,
                avatar_small,
            });
        } else {
            throw new Error("User does not exist");
        }
        return res.status(200).send({ message: "Update successful!" });
    } catch (error) {
        console.error({ error });
        return res
            .status(500)
            .send({ message: error.message || "Internal Server Error!" });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const result = await User.findAll({});
        if (result.length > 0) {
            return res.status(200).send({ success: true, data: result });
        } else {
            return res
                .status(200)
                .send({ success: true, message: "No Record Found" });
        }
    } catch (error) {
        console.log({ error });
        return res
            .status(500)
            .send({ success: false, error: "Internal Server Error!" });
    }
};
