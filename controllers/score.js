const db = require('../models/index.js');
const validator = require('../validations/validator');

exports.score = async (req, res) => {
    const { error } = validator.validateScore(req.body);
    if (error) {
		return res.status(400).json({ 
			success: false, 
			errors: {
				message: error.details[0].message
			} 
		});
    } else {
        for (let index = 0; index < req.body.length; index++) {
            const eachData = req.body[index];
            await db.sequelize.query('CALL spInsert_ScoreByUserId (:in_userid, :in_score, :in_engagementid, :in_record_time)', { 
                replacements: { 
                    in_userid: req.user.id, 
                    in_score: eachData.score, 
                    in_engagementid: eachData.engagementId,
                    in_record_time: eachData.recordTime
                }
            })   
        }
        return res.status(200).send("OK")
    }
};