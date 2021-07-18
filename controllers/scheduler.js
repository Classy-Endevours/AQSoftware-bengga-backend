const engagement = require('../models/engagement.js');
const db = require('../models/index.js');
const validator = require('../validations/validator');
const FeaturedEngagementItems = db.FeaturedEngagementItems;
const TournamentPrize = db.TournamentPrize;
const FunTypeFamily = db.FunTypeFamily;
const FunType = db.FunType;
const Engagement = db.Engagement;
const User = db.User;
const EngagementSked = db.EngagementSked;

exports.scheduler = async (req, res) => {
    // const { error } = validator.validateScore(req.body);
    // if (error) {
	// 	return res.status(400).json({ 
	// 		success: false, 
	// 		errors: {
	// 			message: error.details[0].message
	// 		} 
	// 	});
    // } else {
        /* Logic-->
            1. Loop over channel array
            2. insert into featured_engagement_items table
            3. insert prizes into tournament_prizes tables
            4. prepare a json like 
            [{
                "funTypeFamily":{
                    "id":"D6sLlOOTEea_Af5VE1A08w",
                    "name":"Tourney",
                },
                "items":[
                    {
                        "featuredId":"T8M9IMkaEeulNO5lIFyk6w",
                        "sortOrder":1,
                        "isSpecial":false,
                        "engagement":{
                            "id":"HWm8MMg2EeuIpnBzy8BQ6w",
                            "title":"iMonk",
                            "imageBig":"https://s3.amazonaws.com/famers/720/F9759574608325NA5ZD.jpg",
                            "imageSmall":"https://s3.amazonaws.com/famers/160/F9759574608325NA5ZD.jpg",
                            "video":"https://s3.amazonaws.com/famers/mp4/F975957460833D0ORUD.mp4",
                            "source":{
                                "id":"q1gKAGUOEeak0QJCrBEABQ",
                                "displayName":"Bengga",
                                "avatarBig":"https://s3.amazonaws.com/famers/720/F909706946442E5QND4.png",
                                "avatarSmall":"https://s3.amazonaws.com/famers/160/F909706946442E5QND4.png",
                                "userType":1
                            },
                            fun type table
                            "funType":{
                                "id":"ExF1MDhcEeurm3Bzy8BQ6w",
                                "name":"iMonk",
                                "rating":3.0,
                                "imageBig":"https://s3.amazonaws.com/famers/720/F696773208184HWPJ0H.jpg",
                                "imageSmall":"https://s3.amazonaws.com/famers/720/F696773208184HWPJ0H.jpg",
                                "family":{
                                    "id":"D6sEguOTEea_Af5VE1A08w",
                                    "name":"Famer",
                                    "color":9830400,
                                    "leaderboardColor1":10667752,
                                    "leaderboardColor2":16507859
                                },
                                "type":2,
                                "webUrl":"https://bengga-web-funtypes-sg.s3-ap-southeast-1.amazonaws.com/live/iMonk/index.html",
                                "packageFileUrl":"https://bengga-web-funtypes-sg.s3-accelerate.amazonaws.com/live/iMonk/package.zip",
                                "packageFileHash":"64a7affecfc265b525c547038c4cf45e33423821",
                                "isLandscape":false,
                                "mode":0,
                                "numPlayers":1,
                                "withSound":false
                            },
                            "createDate":"2021-06-08T12:58:37.158Z",
                            "lastModifiedDate":"2021-06-08T12:58:37.158Z",
                            "publishDate":"2020-03-01T00:00:00.000Z",
                            "joinStartDate":"2020-03-01T00:00:00.000Z",
                            "joinEndDate":"2021-06-10T12:00:00.000Z"
                        },
                        "postloaderImageBig":"https://s3.amazonaws.com/famers/720/F373360622480KFO2SS.png",
                        "joinType":0,
                        "targetScore":0,
                        "topPlayers":20,
                        "joinFee":0,
                        "joinTicket":0,
                        "joinHour":0,
                        "joinFeeType":0,
                        "potMoney":0,
                        "potMoneyAsOf":"",
                        "userCap":0,
                        "tourneyWinnersUrl":"https://s3.amazonaws.com/famers/720/F1527703446214444ONL.jpg"
                    },{}
                ] 
            },{...},{...}]
           
            5. Insert the above json into engagement_sked table
         */
        const body = req.body
        const outputJson = []
        const outputjsonItems = []
        for (let index = 0; index < body.channel.length; index++) {
            const eachChannel = body.channel[index];
            const { 
                funTypeFamilyId, 
                engagementId, 
                sortOrder, 
                isSpecial, 
                preloaderImageBig,
                postloaderImageBig,
                targetScore,
                joinHour,
                topPlayers,
                joinFee,
                joinTicket,
                joinFeeType,
                potMoney,
                userCap,
                tourneyWinnersUrl,
                prizes
            } = eachChannel
            let channelData = {
                fun_type_family_id: funTypeFamilyId, 
                engagement_id: engagementId, 
                publish_time: body.publishDate, 
            }
            if(sortOrder) {
                channelData['sort_order'] = sortOrder
            }
            if(isSpecial) {
                channelData['is_special'] = isSpecial
            }
            if(preloaderImageBig) {
                channelData['preloader_image_big'] = preloaderImageBig
            }
            if(postloaderImageBig) {
                channelData['postloader_image_big'] = postloaderImageBig
            }
            if(targetScore) {
                channelData['target_score'] = targetScore
            }
            if(topPlayers) {
                channelData['top_players'] = topPlayers
            }
            if(joinFee) {
                channelData['join_fee'] = joinFee
            }
            if(joinTicket) {
                channelData['join_ticket'] = joinTicket
            }
            if(joinHour) {
                channelData['join_hour'] = joinHour
            }
            if(joinFeeType) {
                channelData['join_fee_type'] = joinFeeType
            }  
            if(potMoney) {
                channelData['pot_money'] = potMoney
            }  
            if(userCap) {
                channelData['user_cap'] = userCap
            }  
            if(tourneyWinnersUrl) {
                channelData['tourney_winners_url'] = tourneyWinnersUrl
            }
            const channel = new FeaturedEngagementItems(channelData)
            await channel.save()
            
            if(prizes) {
                for (let indice = 0; indice < prizes.length; indice++) {
                    const eachPrize = prizes[indice];
                    let prizeData = {
                        engagement_id: engagementId,
                        rank: eachPrize.fromRank,
                        bm_amount: eachPrize.bmAmount,
                        name: eachPrize.name
                    }
                    if(eachPrize.productId) {
                        prizeData['product_id'] = eachPrize.productId
                    }
                    const prizesData = new TournamentPrize(prizeData)
                    await prizesData.save()
                }
            } 
        }
        const featuredData = await FeaturedEngagementItems.findAll({
            include: [{
                model: Engagement,
                include: [{
                    model: FunType,
                    attributes: {
                        exclude: ['join_fee','join_ticket','join_hour','join_fee_type','pot_money','tourney_winners_url']
                    },
                    required: true
                }, {
                    model: User,
                    required: true
                }],
                required: true
            },{
                model: FunTypeFamily,
                required: true,
            }],
            order: [
                ['fun_type_family_id', 'ASC'],
                ['sort_order', 'ASC']
            ]
        })

        const featuredDataJson = JSON.parse(JSON.stringify(featuredData))
        for (let index = 0; index < featuredDataJson.length; index++) {
            const eachFeature = featuredDataJson[index];
            const { Engagement, FunTypeFamily } = eachFeature
            console.log("eachFeature -->", eachFeature)
            console.log("engagement -->", Engagement)
            console.log("fun type family -->",  FunTypeFamily)
        }
        // const singleChannelData = await FeaturedEngagementItems.findOne({ where: { id: channel.dataValues.id } })
        //     const funTypeFamilyData = await FunTypeFamily.findOne( { where: { id: channel.dataValues.fun_type_family_id } })
        //     const engagement = await Engagement.findOne({ where: { id: channel.dataValues.engagement_id } })
        //     const user = await User.findOne({where: { id: engagement.dataValues.source_id } })
        //     const funTypeFamilyJson = funTypeFamilyData.dataValues
        //     const funTypeData = await FunType.findOne( { where: { id: engagement.dataValues.fun_type_id } })
            // const funTypeJson = {
            //     id: Engagement.FunType.id,
            //     name: Engagement.FunType.name,
            //     imageBig: Engagement.FunType.image_big,
            //     imageSmall: Engagement.FunType.image_small,
            //     family: funTypeFamilyJson,
            //     type: Engagement.FunType.type,
            //     webUrl: Engagement.FunType.web_url,
            //     packageFileUrl: Engagement.FunType.package_file_url,
            //     packageFileHash: Engagement.FunType.package_file_hash,
            //     isLandscape: Engagement.FunType.is_landscape == 0? false:  true,
            //     mode: Engagement.FunType.mode,
            //     numPlayers: Engagement.FunType.numplayers,
            //     withSound: Engagement.FunType.with_sound == 0 ? false: true
            // }
        //     const engagementJson = {
        //         id: engagement.dataValues.id,
        //         title: engagement.dataValues.title,
        //         imageBig: engagement.dataValues.image_big,
        //         imageSmall: engagement.dataValues.image_small,
        //         video: engagement.dataValues.video,
        //         source: {
        //             id: user.dataValues.id,
        //             displayName: user.dataValues.display_name,
        //             avatarBig: user.dataValues.avatar_big,
        //             avatarSmall: user.dataValues.avatar_small,
        //             userType: user.dataValues.user_type
        //         },
        //         funType: funTypeJson,
        //         createDate: engagement.dataValues.create_date,
        //         lastModifiedDate: engagement.dataValues.last_modified_date,
        //         publishDate: body.publishDate,
        //         joinStartDate: engagement.dataValues.join_start_date,
        //         joinEndDate: engagement.dataValues.join_end_date   
        //     }
        //     const featureJson = {
        //         featuredId: singleChannelData.dataValues.id,
        //         sortOrder: singleChannelData.dataValues.sort_order,
        //         isSpecial: singleChannelData.dataValues.is_special,
        //         engagement: engagementJson,
        //         preloaderImageBig: singleChannelData.dataValues.preloader_image_big,
        //         postloaderImageBig: singleChannelData.dataValues.postloader_image_big,
        //         joinType: singleChannelData.dataValues.join_type,
        //         targetScore: singleChannelData.dataValues.target_score,
        //         topPlayers: singleChannelData.dataValues.top_players,
        //         joinFee: singleChannelData.dataValues.join_fee,
        //         joinTicket: singleChannelData.dataValues.join_ticket,
        //         joinHour: singleChannelData.dataValues.join_hour,
        //         joinFeeType: singleChannelData.dataValues.join_fee_type,
        //         potMoney: singleChannelData.dataValues.pot_money,
        //         // potMoneyAsOf: "",
        //         userCap: singleChannelData.dataValues.user_cap,
        //         tourneyWinnersUrl: singleChannelData.dataValues.tourney_winners_url
        //     }
        //     outputjsonItems.push(featureJson)

        return res.status(200).send("OK")
    // }
};


exports.getAllSchedules = async (req,res) => {
    const schedulerData = await EngagementSked.findAll({where: {is_active: 1}})
    console.log(JSON.parse(JSON.stringify(schedulerData)))
    res.status(200).send(JSON.parse(JSON.stringify(schedulerData)))
};