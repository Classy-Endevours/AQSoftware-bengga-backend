const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FeatureEngagementItems extends Model {
        static associate(models) {
            // define association here
            FeatureEngagementItems.belongsTo(models.Engagement, {
                foreignKey: 'engagement_id',
            });

            FeatureEngagementItems.belongsTo(models.FunTypeFamily, {
                foreignKey: 'fun_type_family_id',
            });
        } 
    }
    FeatureEngagementItems.init({
        engagement_id: {
            type: DataTypes.INTEGER
        },
        fun_type_family_id: {
            type: DataTypes.INTEGER,
        },
        sort_order: {
            type: DataTypes.INTEGER,
        },
        publish_time: {
            type: DataTypes.DATE,
        },
        is_special: {
            type: DataTypes.INTEGER,
        },
        preloader_image_big: {
            type: DataTypes.STRING(1000),
        },
        postloader_image_big: {
            type: DataTypes.STRING(1000),
        },
        target_score: {
            type: DataTypes.INTEGER,
        },
        top_players: {
            type: DataTypes.INTEGER,
        },
        join_fee: {
            type: DataTypes.INTEGER,
        },
        join_ticket: {
            type: DataTypes.INTEGER,
        },
        join_hour: {
            type: DataTypes.INTEGER,
        },
        join_fee_type: {
            type: DataTypes.INTEGER,
        },
        pot_money: {
            type: DataTypes.INTEGER,
        },
        tourney_winners_url: {
            type: DataTypes.STRING(1000),
        },
        create_date: {
            type: DataTypes.DATE,
        },
        last_modified_date: {
            type: DataTypes.DATE,
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'FeaturedEngagementItems', // We need to choose the model name
        tableName: 'featured_engagement_items',
        timestamps: false,
        
    });
    return FeatureEngagementItems
}