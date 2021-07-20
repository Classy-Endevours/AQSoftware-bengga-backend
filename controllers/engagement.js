const {
    Engagement,
    FeaturedEngagementItems,
    FunTypeFamily,
} = require("../models/index.js");

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
        return res
            .status(500)
            .send({
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
