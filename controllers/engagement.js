const  {
    Engagement,
    FeaturedEngagementItems,
    FunTypeFamily,
    FunType,
} = require("../models/index.js");
const models = require("../models/index.js");
const validator = require("../validations/validator");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.getEngagement = async (req, res) => {
    try {
        const result = await Engagement.findAll({
            include: [FeaturedEngagementItems],
        });
        if (result.length > 0) {
            return res.status(200).send({ success: true, data: result });
        } else {
            return res
                .status(200)
                .send({ success: true, data: [], message: "No Record Found" });
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).send({
            success: false,
            data: [],
            message: "Internal Server Error!",
        });
    }
};

exports.getBanner = async (req, res) => {
    try {
        const result = await FeaturedEngagementItems.findAll({
            include: [FunTypeFamily],
        });
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
            .send({ success: false, message: "Internal Server Error!" });
    }
};

exports.createBanner = async (req, res) => {
    try {
        const { error } = validator.validateCreateBanner(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                errors: {
                    message: error.details[0].message,
                },
            });
        }
        const {
            engagement_id,
            fun_type_family_id,
            sort_order,
            publish_time,
            is_special,
            preloader_image_big,
            postloader_image_big,
            target_score,
            top_players,
            join_fee,
            join_ticket,
            join_hour,
            join_fee_type,
            pot_money,
            tourney_winners_url,
        } = req.body;
        const result = await FeaturedEngagementItems.create({
            engagement_id,
            fun_type_family_id,
            sort_order,
            publish_time,
            is_special,
            preloader_image_big,
            postloader_image_big,
            target_score,
            top_players,
            join_fee,
            join_ticket,
            join_hour,
            join_fee_type,
            pot_money,
            tourney_winners_url,
            create_date: new Date(),
            last_modified_date: new Date(),
        });
        return res
            .status(200)
            .send({ success: true, data: result, message: "Banner Created" });
    } catch (error) {
        console.error({ error });
        return res
            .status(500)
            .send({ message: error.message || "Internal Server Error!" });
    }
};

exports.getGames = async (req, res) => {
    try {
        const result = await FunType.findAll({});
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
            .send({ success: false, message: "Internal Server Error!" });
    }
};

exports.getTournaments = async (req, res) => {
    try {
        const options = {
            include: [FeaturedEngagementItems, FunType],
        };
        if (req.params.fun_type_id) {
            options.where = {
                fun_type_id: req.params.fun_type_id,
            };
        } else if (req.params.search) {
            options.where = {
                [Op.or]: [
                    { title: { [Op.like]: "%" + req.params.search + "%" } },
                    {
                        id: {
                            [Op.like]: "%" + req.params.search + "%",
                        },
                    },
                    {
                        "$FunType.name$": {
                            [Op.like]: "%" + req.params.search + "%",
                        },
                    },
                    {
                        "$FunType.description$": {
                            [Op.like]: "%" + req.params.search + "%",
                        },
                    },
                ],
            };
        }
        const result = await Engagement.findAll(options);
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
            .send({ success: false, message: "Internal Server Error!" });
    }
};

exports.createTournaments = async (req, res) => {
    try {
        const { error } = validator.validateCreateTournaments(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                errors: {
                    message: error.details[0].message,
                },
            });
        }
        const old_id = uuidv4();
        const newOldId = await models.sequelize.query(
            `select uuid_to_bin("${old_id}", true) as oid`
        );
        const {
            fun_type_id,
            title,
            image_big,
            image_small,
            video,
            source_id,
            tips_image_big,
            join_start_date,
            join_end_date,
        } = req.body;
        const result = await Engagement.create({
            old_id: newOldId[0][0]?.oid,
            fun_type_id,
            title,
            image_big,
            image_small,
            video,
            is_deleted: false,
            source_id,
            tips_image_big,
            join_start_date: new Date(join_start_date),
            join_end_date: new Date(join_end_date),
            create_date: new Date(),
            last_modified_date: new Date(),
        });
        return res
            .status(200)
            .send({ success: true, data: result, message: "Tournament Created" });
    } catch (error) {
        console.log({ error });
        return res
            .status(500)
            .send({ success: false, message: "Internal Server Error!" });
    }
};
