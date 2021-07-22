const { Model} = require('sequelize');
const db = require('./index');

module.exports = (sequelize, DataTypes) => {
    class Engagement extends Model {
        static associate(models) {
            // define association here
            Engagement.belongsTo(models.User, {
                foreignKey: 'source_id',
            });
        
            Engagement.belongsTo(models.FunType, {
                foreignKey: 'fun_type_id',
            });
            Engagement.hasMany(models.FeaturedEngagementItems, {
                foreignKey: 'engagement_id',
            });
        } 
    }
    Engagement.init({
        old_id: {
            type: DataTypes.STRING.BINARY,
        },
        title: {
            type: DataTypes.STRING,
        },
        fun_type_id: {
            type: DataTypes.INTEGER,
        },
        image_big: {
            type: DataTypes.STRING(1000),        
        },
        image_small: {
            type: DataTypes.STRING(1000),        
        },
        video: {
            type: DataTypes.STRING(1000),
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
        },
        source_id: {
            type: DataTypes.INTEGER,
        },
        tips_image_big: {
            type: DataTypes.STRING(1000),
        },
        join_start_date: {
            type: DataTypes.DATE,
        },
        join_end_date: {
            type: DataTypes.DATE,
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
        modelName: 'Engagement', // We need to choose the model name
        tableName: 'engagements',
        timestamps: false
    });
    return Engagement
}