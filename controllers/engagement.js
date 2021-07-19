const { Engagement, FeaturedEngagementItems } = require("../models/index.js");

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
                .send({ success: true, error: "No Record Found" });
        }
    } catch (error) {
        console.log({ error });
        return res
            .status(500)
            .send({ success: false, error: "Internal Server Error!" });
    }
};
