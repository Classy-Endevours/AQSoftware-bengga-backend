const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EngagementSked extends Model {
        static associate(models) {
            // define association here
          } 
    }
    EngagementSked.init({
        create_date: {
            type: DataTypes.DATE,
        },
        last_modified_date: {
            type: DataTypes.DATE,
        },
        publish_time: {
            type: DataTypes.DATE,
        },
        is_active: {
            type: DataTypes.INTEGER,
        },
        json_data: {
            type: DataTypes.JSON,
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'EngagementSked', // We need to choose the model name
        tableName: 'engagement_sked',
        timestamps: false
    });
    return EngagementSked
}