const Joi = require('joi');

exports.validateLogin = (data) => {
    const LoginSchema = Joi.object({
        apiKey: Joi.string().required(),
        oldId: Joi.string().required(),
    })
    return LoginSchema.validate(data)
};
exports.validateRegistration = (data) => {
    const LoginSchema = Joi.object({
        display_name: Joi.string().required(),
        phone_number: Joi.string().required(),
        avatar_big: Joi.string().required(),
        avatar_small: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        referred_by_id: Joi.string().optional(),
    })
    return LoginSchema.validate(data)
};
exports.validateUpdateProfile = (data) => {
    const LoginSchema = Joi.object({
        display_name: Joi.string().required(),
        avatar_big: Joi.string().required(),
        avatar_small: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        id: Joi.string().required(),
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