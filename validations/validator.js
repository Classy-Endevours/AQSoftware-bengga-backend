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
        display_name: Joi.string().optional(),
        phone_number: Joi.string().required(),
        avatar_big: Joi.string().optional(),
        avatar_small: Joi.string().optional(),
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
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

exports.validateCreateBanner = (data) => {
    const CreateBannerSchema = Joi.object({
        engagement_id: Joi.number().required(),
        fun_type_family_id: Joi.number().required(),
        sort_order: Joi.number().required(),
        publish_time: Joi.string().required(),
        is_special: Joi.boolean().required(),
        preloader_image_big: Joi.string().required(),
        postloader_image_big: Joi.string().required(),
        target_score: Joi.number().required(),
        top_players: Joi.number().required(),
        join_fee: Joi.number().required(),
        join_ticket: Joi.number().required(),
        join_hour: Joi.number().required(),
        join_fee_type: Joi.number().required(),
        pot_money: Joi.number().required(),
        tourney_winners_url: Joi.string().required(),
    });
    return CreateBannerSchema.validate(data);
};

exports.validateCreateTournaments = (data) => {
    const CreateTournamentsSchema = Joi.object({
        fun_type_id: Joi.number().required(),
        title: Joi.string().required(),
        image_big: Joi.string().required(),
        image_small: Joi.string().required(),
        video: Joi.string().required(),
        source_id: Joi.number().required(),
        tips_image_big: Joi.string().required(),
        join_start_date: Joi.string().required(),
        join_end_date: Joi.string().required(),
    });
    return CreateTournamentsSchema.validate(data);
};