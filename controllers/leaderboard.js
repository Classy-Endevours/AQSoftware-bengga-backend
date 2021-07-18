const db = require('../models/index.js');
const validator = require('../validations/validator');

exports.leaderboard = async (req, res) => {
    const { error } = validator.validateItems(req.query);
    if (error) {
		return res.status(400).json({ 
			success: false, 
			errors: {
				message: error.details[0].message
			} 
		});
    } else {
        const count = req.query.numItems ? req.query.numItems: 10
        const data = await db.sequelize.query('CALL spSelect_UsersByRank (:in_userid, :in_count, :in_engagementid)', { 
            replacements: { 
                in_userid: req.user.id, 
                in_count: count, 
                in_engagementid: req.query.engagementId
            }
        })
        return res.status(200).send(data)   
    }
};


exports.getUserData = async (req, res) => {
    const { error } = validator.validateId(req.query);
    if (error) {
		return res.status(400).json({ 
			success: false, 
			errors: {
				message: error.details[0].message
			} 
		});
    } else {
        const data = await db.sequelize.query('CALL spSelect_UsersRank (:in_userid, :in_engagementid)', { 
            replacements: { 
                in_userid: req.user.id, 
                in_engagementid: req.query.engagementId
            }
        })
        if(data.length) {
            return res.status(200).send({ success:true, data:data[0]})
        } else {
            return res.status(200).send({ success: true, error: "No Record Found For This user"})
        }
    }
};