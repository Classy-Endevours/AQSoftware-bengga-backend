const {
    Engagement,
    FeaturedEngagementItems,
    FunTypeFamily,
} = require("../models/index.js");
const validator = require("../validations/validator");

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
        return res.status(200).send({success: true, data:result, message: "Banner Created" });
    } catch (error) {
        console.error({ error });
        return res
            .status(500)
            .send({ message: error.message || "Internal Server Error!" });
    }
};
