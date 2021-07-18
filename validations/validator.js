const Joi = require('joi');

exports.validateLogin = (data) => {
    const LoginSchema = Joi.object({
        apiKey: Joi.string().required(),
        oldId: Joi.string().required(),
    })
    return LoginSchema.validate(data)
};

exports.validateScore = (data)=>{
    const ScoreSchema = Joi.array().items(Joi.object({
        engagementId: Joi.number(),
        score : Joi.number(),
        recordTime: Joi.date()
    }))
    return ScoreSchema.validate(data)
}

exports.validateItems = (data)=>{
    const ItemSchema = Joi.object({
        engagementId: Joi.number().required(),
        numItems : Joi.number()
    })
    return ItemSchema.validate(data)
}

exports.validateId = (data)=>{
    const IdSchema = Joi.object({
        engagementId: Joi.number().required(),
    })
    return IdSchema.validate(data)
}